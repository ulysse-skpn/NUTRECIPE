import { User } from "../entity/UserEntity"

export interface IUserService
{
    userExist(id:number): Promise<boolean>
    getAllUsers(limit:number,offset:number): Promise<User[]>
    getUserById(id:number): Promise<User>
    addUser(item:User): Promise<User>
    updateUser(id:number,item:User): Promise<[affectedCount:number]> // number => Affected row
    deleteUser(id:number): Promise<number>
}