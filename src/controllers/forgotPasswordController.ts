import { Request, Response } from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { ForgotPasswordServiceImpl } from "../service/Impl/ForgotPasswordServiceImpl"
import crypto from 'crypto';
import { User } from "../entity/UserEntity";

export class ForgotPasswordCtrl
{
    async forgotPassword(req:Request,res:Response)
    {
        const forgotPasswordServiceImpl:ForgotPasswordServiceImpl = new ForgotPasswordServiceImpl()

        try 
        {
            const login:string = req.body.email

            const user:User|null = await forgotPasswordServiceImpl.findUserByLogin(login)
            if( user )
            {
                const password = await generateNewPassword()
    
                if( password )
                {
                    const result = await forgotPasswordServiceImpl.saveNewPassword(login,password)
                    const newPassword = 
                    {
                        newPassword : password
                    }
                    
                    if( result ) res.status(200).send(newPassword)
                    else res.status(500).send( ApiError.internal_server_error("Internal server error") )
                }
                else res.status(520).send( ApiError.unknown_error("An unknown error occured") )
            }
            else res.status(404).send( ApiError.not_found("User with this login doesn't exist") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => FORGOT_PASSWORD : ${err.message}` )
            res.status(520).send( ApiError.unknown_error(err.message) )
        }
    }

}

const generateNewPassword = async () =>
{
    const chars: string = "0123456789abcdefghijklmnopqrstuvwxyz!@#$*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength: number = 10;
    let password: string = ""

    for ( let i = 0 ; i <= passwordLength; i++ ) 
    {
        const randomNumber:number = crypto.randomInt(0, (chars.length - 1) )
        password += chars.substring(randomNumber, randomNumber +1)
    }

    return password
}
