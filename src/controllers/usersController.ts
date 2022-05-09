import { Request, Response} from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { UserServiceImpl } from "../service/Impl/UserServiceImpl";
import { User } from "../entity/UserEntity";

/**
 * @classdesc Controller of users
 */
export class UsersCtrl
{   
    /**
     * Get All users
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {User[]} Array of users
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    async getAll(req:Request , res:Response)
    {
        /**
         * instantiate user service implementation
         * @typedef {Object} UserServiceImpl
         * @type {UserServiceImpl}
         * @class
         * @instance
         */
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            /**
             * Get all users
             * @typedef {Object} User
             * @type {User}
             * @function getAllUsers
             */
            const usersList:User[] = await userServiceImpl.getAllUsers()
            res.status(200).send(usersList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Users : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }

    /**
     * Get the size of all users array
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    async getAllSize(req:Request , res:Response)
    {
        /**
         * instantiate user service implementation
         * @typedef {Object} UserServiceImpl
         * @type {UserServiceImpl}
         * @class
         * @instance
         */
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            /**
             * Get number of users
             * @function getNumberElements
             */
            const size = await userServiceImpl.getNumberElements()
            res.status(200).send(size[0][0])
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Users size : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    } 

    /**
     * Get an user by id
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @typedef {Object} not_found
     * @throws {badRequest}
     * @throws {not_found} user was not found in the database
     */
    async getById(req:Request , res:Response)
    {
        let id:number

        /**
         * instantiate user service implementation
         * @typedef {Object} UserServiceImpl
         * @type {UserServiceImpl}
         * @class
         * @instance
         */
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            /**
             * @param {string} req.params.id
             */
            id = parseInt(req.params.id)

            /**
             * @throws {Error} Id is not a number
             */
            if( isNaN(id) ) throw Error("User Id is not a number")

            /**
             * Get a user by his id
             * @typedef {Object} User
             * @type {User}
             * @function getUserById
             * @param {number} id
             */
            const user:User = await userServiceImpl.getUserById(id)

            if( user ) res.status(200).send(user)
            else res.status(404).send( ApiError.not_found("There is no user with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET User BY ID : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }

    /**
     * Create a user
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    async create(req:Request , res:Response)
    {
        /**
         * instantiate user service implementation
         * @typedef {Object} UserServiceImpl
         * @type {UserServiceImpl}
         * @class
         * @instance
         */
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            /**
             * @throws {Error} Object is malformed
             */
            if( !isUser(req.body) ) throw Error("User object is malformed")

            /**
             * Request from client side
             */
            const user: User = req.body

            /**
             * Add a user
             * @typedef {Object} User
             * @type {User}
             * @function addUser
             * @param {User} user
             */
            const result:User = await userServiceImpl.addUser(user)
            res.status(201).send(result)
        } 
        catch (err:any) 
        {
            logger.error( `Method => POST User : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }

    /**
     * Update a user
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} user is not found
     */
    async update(req:Request , res:Response)
    {
        let id:number

        /**
         * instantiate user service implementation
         * @typedef {Object} UserServiceImpl
         * @type {UserServiceImpl}
         * @class
         * @instance
         */
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            /**
             * @param {string} req.params.id
             */
            id = parseInt(req.params.id)

            /**
             * @throws {Error} Id is not a number
             */
            if( isNaN(id) ) throw Error("User Id is not a number")

            /**
             * @throws {Error} Object is malformed
             */
            if( !isUser(req.body) ) throw Error("User object is malformed")

            /**
             * Request from client side
             */
            const user: User = req.body

            /**
             * Update a user
             * @typedef {Object} User
             * @type {[affectedCount:number]}
             * @function updateUser
             * @param id
             * @param {User} user
             */
            const result: [affectedCount: number] = await userServiceImpl.updateUser(id,user)

            if( result ) res.status(202).send(result)
            else res.status(404).send( ApiError.not_found("There is no user with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => PUT User : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }


    /**
     * Delete a user
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} user is not found
     */
    async delete(req:Request , res:Response)
    {
        let id:number

        /**
         * instantiate user service implementation
         * @typedef {Object} UserServiceImpl
         * @type {UserServiceImpl}
         * @class
         * @instance
         */
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            /**
             * @param {string} req.params.id
             */
            id = parseInt(req.params.id)

            /**
             * @throws {Error} Id is not a number
             */
            if( isNaN(id) ) throw Error("User Id is not a number")

            /**
             * Delete a user
             * @function deleteUser
             * @param {number} id
             */
            await userServiceImpl.deleteUser(id)
            res.status(204).send(true)
        } 
        catch (err:any) 
        {
            logger.error( `Method => DELETE User : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }

}


/**
 * 
 * @param obj 
 * @returns {boolean}
 */
export const isUser = (obj:any): boolean => {
    if( obj.hasOwnProperty("last_name")
    && obj.hasOwnProperty("first_name")
    && obj.hasOwnProperty("phone_number")
    && obj.hasOwnProperty("email")
    && obj.hasOwnProperty("password")
    && obj.hasOwnProperty("role")
    && obj.hasOwnProperty("receiveEmail")
    && obj.hasOwnProperty("receiveNotification")
    ) return true
    else return false
}
