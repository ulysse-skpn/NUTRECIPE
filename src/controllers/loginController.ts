import { Request, Response } from "express";
import { User } from "../entity/UserEntity";
import { ApiError } from "../handlers/ApiError";
import { logger } from "../lib/config/winston";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginServiceImpl } from "../service/Impl/LoginServiceImpl";

/**
 * @classdesc Controller of login page
 */
export class LoginCtrl
{
    /**
     * @typedef {Object} forbidden
     * @typedef {Object} badRequest
     * @typedef {Object} not_found
     * @param {Request} req express request
     * @param {Response} res express response
     * @throws { forbidden } The password does not correspond to the user
     * @throws { badRequest } 
     * @throws { not_found } User is not found
     */
    async login(req:Request , res:Response)
    {   
        /**
         * instantiate login service implementation
         * @typedef {Object} LoginServiceImpl
         * @type {LoginServiceImpl}
         * @class
         * @instance
         */
        const loginServiceImpl:LoginServiceImpl = new LoginServiceImpl()

        try 
        {
            const login:string = req.body.email
            const password:string = req.body.password
            
            /**
             * find if a user exists
             * @typedef {Object} User
             * @type {(User|null)}
             * @function userExist
             * @param {string} login
             */
            const user:User|null = await loginServiceImpl.userExist(login)
            
            if( user )
            {
                /**
                * Compare the password of the user from the database with the password from the client side
                * @type {boolean}
                */
                const result: boolean = bcrypt.compareSync( password , user.password )
                
                if( result === true )
                {
                    const SECRET_KEY:string = "secretkey23456";

                    const expiresIn = 60 * 60 * 24
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