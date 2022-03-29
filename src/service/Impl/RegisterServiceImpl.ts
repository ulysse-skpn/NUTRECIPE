import { UserRepository } from "../../DAO/UserRepository";
import { User } from "../../entity/UserEntity";
import { IRegisterService } from "../IRegisterService";

export class RegisterServiceImpl implements IRegisterService
{
    userRepository: UserRepository = new UserRepository()

    async createUser(user:User): Promise<User> 
    {
        return await this.userRepository.create(user)
    }
}