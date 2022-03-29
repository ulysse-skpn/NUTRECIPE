import { Request, Response } from "express";
import { User } from "../entity/UserEntity";
import { ApiError } from "../handlers/ApiError";
import { logger } from "../lib/config/winston";
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

            const user:User|null = await loginServiceImpl.userExist(login,password)

            if( user )
            {
                const role:IUserRole|null = await loginServiceImpl.getUserRole(login,password)
                res.status(200).send(role)
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