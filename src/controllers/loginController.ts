import { Request, Response } from "express";
import { User } from "../entity/UserEntity";
import { ApiError } from "../handlers/ApiError";
import { logger } from "../lib/config/winston";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRole } from "../service/ILoginService";
import { LoginServiceImpl } from "../service/Impl/LoginServiceImpl";

export class LoginCtrl
{
    async login(req:Request , res:Response)
    {   
        const loginServiceImpl:LoginServiceImpl = new LoginServiceImpl()

        try 
        {
            const login:string = req.body.email
            const password:string = req.body.password

            
            const user:User|null = await loginServiceImpl.userExist(login)
            
            if( user )
            {
                const result: boolean = bcrypt.compareSync( password , user.password )
                if( result === true )
                {
                    const SECRET_KEY:string = "secretkey23456";

                    const expiresIn = 24 * 60 * 60
                    const accessToken = jwt.sign( {id:user.id} , SECRET_KEY , {
                        expiresIn: expiresIn
                    })
                    res.status(201).send({ "user": user , "access_token": accessToken, "expires_in": expiresIn})
                }
                else res.status(403).send( ApiError.forbidden("Bad password") )
            }
            else res.status(404).send( ApiError.not_found("User with this login and/or password not found") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => LOGIN : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }
}