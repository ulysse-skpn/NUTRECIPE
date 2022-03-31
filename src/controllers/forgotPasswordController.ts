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
                const newPassword:string = await generateNewPassword()
    
                if( newPassword )
                {

                    await forgotPasswordServiceImpl.saveNewPassword(login,newPassword)
                            .then( () => {
                                res.status(200).send( `An email with your new password has be sent to you ${newPassword}` )
                            })
                            .catch( (err:any) => {
                                res.status(500).send( ApiError.internal_server_error(err.message) )
                            })

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
