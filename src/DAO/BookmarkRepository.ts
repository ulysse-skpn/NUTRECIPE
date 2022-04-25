import { IBaseRepository } from "./IBaseRepository"
import { database } from "../lib/config/database"
import { UpdateOptions , DestroyOptions } from "sequelize"
import { Bookmark } from "../entity/BookmarkEntity"
import { User } from "../entity/UserEntity"

export class BookmarkRepository implements IBaseRepository<Bookmark>
{
    bookmarkRepository = database.getRepository(Bookmark)
    userRepository = database.getRepository(User)


    async exists(id: number): Promise<boolean> 
    {
        return !!this.bookmarkRepository.findByPk(id)
    }

    async findById(id: number): Promise<Bookmark | any> 
    {
        return this.bookmarkRepository.findByPk(id,{include:[this.userRepository]})
    }

    async create(item: Bookmark): Promise<Bookmark> 
    {
        return this.bookmarkRepository.create(item,{include:[this.userRepository]})
    }

    async put(id: number, item: Bookmark): Promise<[affectedCount:number]> 
    {
        const options:UpdateOptions = 
        {
            where:{id:id},
            limit:1
        }
        return this.bookmarkRepository.update(item,options)
    }

    async delete(id: number): Promise<number> 
    {
        const options:DestroyOptions = 
        {
            where:{id:id},
            limit:1
        }
        return this.bookmarkRepository.destroy(options)
    }

    async findAll(): Promise<Bookmark[]> 
    {
        return this.bookmarkRepository.findAll({include:[this.userRepository]})
    }

    async updateOrCreate(id:number,item:Bookmark): Promise<Bookmark | [affectedCount:number]>
    {
        const foundItem = await this.bookmarkRepository.findOne({where:{itemId:id}})

        if( !foundItem )
        {
            return this.bookmarkRepository.create(item)
        }
        
        const options:UpdateOptions = 
        {
            where: {itemId:id}
        }
        
        return this.bookmarkRepository.update(item,options)
    }

}