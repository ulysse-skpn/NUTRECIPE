import { UserRepository } from "../../DAO/UserRepository";
import { User } from "../../entity/UserEntity";
import { IForgotPasswordService } from "../IForgotPasswordService";

export class ForgotPasswordServiceImpl implements IForgotPasswordService
{
    userRepository:UserRepository = new UserRepository()

    async saveNewPassword(login:string, newPassword: string): Promise<[affecteCount:number]> 
    {
        const user:User|null = await this.userRepository.findByText(login)

        if( user )
        {
            user.password = newPassword
            const idUser:number = user !== null ? user.id : 0 
            return this.userRepository.put(idUser,user)
        }
        else return [0]
    }

    async findUserByLogin(login: string): Promise<User|null>
    {
        return this.userRepository.findByText(login)
    }

}