import { UserRepository } from "../../DAO/UserRepository"
import { User } from "../../entity/UserEntity"
import { IUserService } from "../IUserService"


export class UserServiceImpl implements IUserService
{
    userRepository : UserRepository = new UserRepository()

    constructor(){}

    async userExist(id: number): Promise<boolean>
    {
        return this.userRepository.exists(id)
    }

    async getAllUsers(): Promise<User[]>
    {
        return this.userRepository.findAll()
    }

    async getUserById(id: number): Promise<User>
    {
        return this.userRepository.findById(id)
    }

    async addUser(item: User): Promise<User>
    {
        return this.userRepository.create(item)
    }

    async updateUser(id: number, item: User): Promise<[affectedcount:number]>
    {
        return this.userRepository.put(id,item)
    }

    async deleteUser(id: number): Promise<number>
    {
        return this.userRepository.delete(id)
    }
    
}