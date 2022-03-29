import { User } from "../entity/UserEntity"

export interface ILoginService
{
    userExist(login:string,password:string): Promise<User|null>
    getUserRole(login:string,password:string): Promise<IUserRole|null>
}

export interface IUserRole
{
    email:string
    role:string
}