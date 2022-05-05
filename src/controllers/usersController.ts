import { Request, Response} from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { UserServiceImpl } from "../service/Impl/UserServiceImpl";
import { User } from "../entity/UserEntity";

export class UsersCtrl
{   
    async getAll(req:Request , res:Response)
    {
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            const usersList:User[] = await userServiceImpl.getAllUsers()
            res.status(200).send(usersList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Users : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    async getAllSize(req:Request , res:Response)
    {
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            const size = await userServiceImpl.getNumberElements()
            res.status(200).send(size[0][0])
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Users size : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    } 


    async getById(req:Request , res:Response)
    {
        let id:number
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("User Id is not a number")

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


    async create(req:Request , res:Response)
    {
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            if( !isUser(req.body) ) throw Error("User object is malformed")
            const user: User = req.body

            const result:User = await userServiceImpl.addUser(user)
            res.status(201).send(result)
        } 
        catch (err:any) 
        {
            logger.error( `Method => POST User : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    async update(req:Request , res:Response)
    {
        let id:number
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("User Id is not a number")
            if( !isUser(req.body) ) throw Error("User object is malformed")

            const user: User = req.body

            const result = await userServiceImpl.updateUser(id,user)

            if( result ) res.status(202).send(result)
            else res.status(404).send( ApiError.not_found("There is no user with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => PUT User : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }


    async delete(req:Request , res:Response)
    {
        let id:number
        const userServiceImpl:UserServiceImpl = new UserServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("User Id is not a number")

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

export const isUser = (obj:any) => {
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
