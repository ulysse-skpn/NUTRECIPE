import { Request, Response } from "express";
import { ApiError } from "../handlers/ApiError";
import { logger } from "../lib/config/winston";
import { RegisterServiceImpl } from "../service/Impl/RegisterServiceImpl";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../entity/UserEntity";
import { isUser } from "./usersController";

/**
 * @classdesc Controller of register page
 */
export class RegisterCtrl
{
    /**
     * @typedef {Object} internal_server_error
     * @param {Request} req express request
     * @param {Response} res express response
     * @throws { internal_server_error } The user was not inserted in the database 
     */
    async register(req:Request , res:Response)
    {
        const SECRET_KEY:string = "secretkey23456";

        /**
         * instantiate register service implementation
         * @typedef {Object} registerServiceImpl
         * @type {RegisterServiceImpl}
         * @class
         * @instance
         */
        const registerServiceImpl: RegisterServiceImpl = new RegisterServiceImpl()

        try 
        {
            /**
             * @throws {Error} User object is malformed
             */
            if( !isUser(req.body) ) throw Error("User object is malformed")
            
            /**
             * hash of the password
             */
            bcrypt.hash( req.body.password , 10 , async (err:any, hash:string) =>
            {
                req.body.last_name = req.body.last_name.toUpperCase()
                req.body.password = hash
                const user:User = req.body

                /**
                 * Create a user
                 * @typedef {Object} User
                 * @type {User}
                 * @function createUser
                 * @param {User} user
                 */
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
            logger.error( `Method => REGISTER : ${err.message}` )
            res.status(500).send( ApiError.internal_server_error(err.message) )
        }
    }
}
