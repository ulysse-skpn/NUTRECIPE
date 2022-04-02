import { Request, Response } from "express";
import { ApiError } from "../handlers/ApiError";
import { logger } from "../lib/config/winston";
import { RegisterServiceImpl } from "../service/Impl/RegisterServiceImpl";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../entity/UserEntity";
import { isUser } from "./usersController";

export class RegisterCtrl
{

    async register(req:Request , res:Response)
    {
        const SECRET_KEY:string = "secretkey23456";
        const registerServiceImpl: RegisterServiceImpl = new RegisterServiceImpl()

        try 
        {
            if( !isUser(req.body) ) throw Error("User object is malformed")
            
            bcrypt.hash( req.body.password , 10 , async (err:any, hash:string) =>
            {
                req.body.last_name = req.body.last_name.toUpperCase()
                req.body.password = hash
                const user:User = req.body
                const createdUser:User = await registerServiceImpl.createUser(user)

                if( createdUser )
                {
                    createdUser.password = hash
                    const expiresIn = 24 * 60 * 60
                    const accessToken = jwt.sign( {id:createdUser.id} , SECRET_KEY , {
                        expiresIn: expiresIn
                    })
                    res.status(201).send({ "user": createdUser , "access_token": accessToken, "expires_in": expiresIn})
                }
                else res.status(500).send( ApiError.internal_server_error(err.message) )
            });
        } 
        catch (err:any) 
        {
            logger.error( `Method => FORGOTPASSWORD : ${err.message}` )
            res.status(500).send( ApiError.internal_server_error(err.message) )
        }
    }
}
