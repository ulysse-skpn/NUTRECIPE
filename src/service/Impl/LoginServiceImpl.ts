import { UserRepository } from "../../DAO/UserRepository";
import { User } from "../../entity/UserEntity";
import { ILoginService, IUserRole } from "../ILoginService";

export class LoginServiceImpl implements ILoginService
{
    userRepository:UserRepository = new UserRepository()

    async userExist(login: string): Promise<User|null> 
    {
        return this.userRepository.findByLogin(login)
    }

    async getUserRole(login: string, password: string): Promise<IUserRole|null> 
    {
        return this.userRepository.findByLoginPassword(login,password)
    }
}