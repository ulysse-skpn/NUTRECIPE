import { Request, Response } from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { ForgotPasswordServiceImpl } from "../service/Impl/ForgotPasswordServiceImpl"
import crypto from 'crypto';
import { User } from "../entity/UserEntity";

/**
 * @classdesc Controller of forgot password page
 */
export class ForgotPasswordCtrl
{
    /**
     * @typedef {Object} internal_server_error
     * @typedef {Object} unknown_error
     * @typedef {Object} not_found
     * @param {Request} req express request
     * @param {Response} res express response
     * @throws { internal_server_error } The new password was not inserted in database
     * @throws { unknown_error }
     * @throws { not_found } User is not found
     */
    async forgotPassword(req:Request,res:Response)
    {
        /**
         * instantiate forgot password service implementation
         * @typedef {Object} ForgotPasswordServiceImpl
         * @type {ForgotPasswordServiceImpl}
         * @class
         * @instance
         */
        const forgotPasswordServiceImpl:ForgotPasswordServiceImpl = new ForgotPasswordServiceImpl()

        try 
        {
            const login:string = req.body.email

            /**
             * find a user by his login (email)
             * @typedef {Object} User
             * @type {(User|null)}
             * @function findUserByLogin
             * @param {string} login
             */
            const user:User|null = await forgotPasswordServiceImpl.findUserByLogin(login)

            if( user )
            {
                /**
                 * new password for the user
                 */
                const password:string = await generateNewPassword()
    
                if( password )
                {
                    /**
                     * @type {[affectedCount:number]} affected count
                     * @function saveNewPassword
                     * @param {string} login
                     * @param {string} password
                     */
                    const result: [affectedCount: number] = await forgotPasswordServiceImpl.saveNewPassword(login,password)
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

/**
 * @async
 * @function generateNewPassword generate a random new password (length : 10) for the user
 * @returns {string} password
 */
const generateNewPassword = async (): Promise<string> =>
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
