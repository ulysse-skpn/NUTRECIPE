import { User } from "../entity/UserEntity";

export interface IRegisterService
{
    createUser(user:User): Promise<User>
}