import { IBaseRepository } from "./IBaseRepository"
import { database } from "../lib/config/database"
import { UpdateOptions , DestroyOptions } from "sequelize"
import { User } from "../entity/UserEntity"
import { Bookmark } from "../entity/BookmarkEntity"

export class UserRepository implements IBaseRepository<User>
{
    userRepository = database.getRepository(User)
    bookmarkRepository = database.getRepository(Bookmark)


    async exists(id: number): Promise<boolean> 
    {
        return !!this.userRepository.findByPk(id)
    }

    async findById(id: number): Promise<User | any> 
    {
        return this.userRepository.findByPk(id , {include:[this.bookmarkRepository]})
    }

    async create(item: User): Promise<User> 
    {
        return this.userRepository.create(item , {include:[this.bookmarkRepository]})
    }

    async put(id: number, item: User): Promise<[affectedCount:number]> 
    {
        const options:UpdateOptions = 
        {
            where:{id:id},
            limit:1
        }
        return this.userRepository.update(item,options)
    }

    async delete(id: number): Promise<number> 
    {
        const options:DestroyOptions = 
        {
            where:{id:id},
            limit:1
        }
        return this.userRepository.destroy(options)
    }

    async findAll(): Promise<User[]> 
    {
        return this.userRepository.findAll({include:[this.bookmarkRepository]})
    }

    async findByText(login:string): Promise<User|null>
    {
        return this.userRepository.findOne({ where:{email:login} })
    }

    async findByLoginPassword(login:string,password:string): Promise<User|null>
    {
        return this.userRepository.findOne({ where:{ email:login , password:password } })
    }

    async patchPassword(login:string,password:string): Promise<[affectedCount:number]>
    {
        const options:UpdateOptions = 
        {
            where:{email:login},
            limit:1
        }
        return this.userRepository.update({password:password},options)
    }

}