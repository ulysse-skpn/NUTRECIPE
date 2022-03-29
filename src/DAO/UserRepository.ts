import { IBaseRepository } from "./IBaseRepository"
import { database } from "../lib/config/database"
import { UpdateOptions , DestroyOptions } from "sequelize"
import { User } from "../entity/UserEntity"

export class UserRepository implements IBaseRepository<User>
{
    userRepository = database.getRepository(User)

    async exists(id: number): Promise<boolean> 
    {
        return !!this.userRepository.findByPk(id)
    }

    async findById(id: number): Promise<User | any> 
    {
        return await this.userRepository.findByPk(id)
    }

    async create(item: User): Promise<User> 
    {
        return await this.userRepository.create(item)
    }

    async put(id: number, item: User): Promise<[affectedCount:number]> 
    {
        const options:UpdateOptions = 
        {
            where:{id:id},
            limit:1
        }
        return await this.userRepository.update(item,options)
    }

    async delete(id: number): Promise<number> 
    {
        const options:DestroyOptions = 
        {
            where:{id:id},
            limit:1
        }
        return await this.userRepository.destroy(options)
    }

    async findAll(): Promise<User[]> 
    {
        return await this.userRepository.findAll()
    }

    async findByText(login:string): Promise<User|null>
    {
        return await this.userRepository.findOne({ where:{email:login} })
    }

    async findByLoginPassword(login:string,password:string): Promise<User|null>
    {
        return await this.userRepository.findOne({ where:{ email:login , password:password } })
    }

}