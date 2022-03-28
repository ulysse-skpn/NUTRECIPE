import { Request, Response } from "express";
import { ApiError } from "../handlers/ApiError";
import { logger } from "../lib/config/winston";
import { RegisterServiceImpl } from "../service/Impl/RegisterServiceImpl";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../entity/UserEntity";

export class RegisterCtrl
{
    SECRET_KEY:string = "secretkey23456";

    async register(req:Request , res:Response)
    {
        const registerServiceImpl: RegisterServiceImpl = new RegisterServiceImpl()

        try 
        {
            bcrypt.hash( req.body.password , 10 , async (err:any, hash:string) =>
            {
                //TODO user DTO ?
                const user:any = 
                {
                    last_name: req.body.last_name,
                    first_name: req.body.first_name,
                    phone_number: req.body.phone_number,
                    email: req.body.login,
                    password: hash,
                    role: "user",
                    created_at: new Date(),
                    updated_at: new Date()
                }

                const createdUser:User = await registerServiceImpl.createUser(user)

                if( createdUser )
                {
                    const expiresIn = 24 * 60 * 60
                    const accessToken = jwt.sign( {id:createdUser.id} , this.SECRET_KEY , {
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
