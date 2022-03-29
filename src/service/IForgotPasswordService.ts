import { User } from "../entity/UserEntity"

export interface IForgotPasswordService
{
    findUserByLogin(login:string): Promise<User|null>
    saveNewPassword(login:string,newPassword:string): Promise<[affectedCount:number]>
}