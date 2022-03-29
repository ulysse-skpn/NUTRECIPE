import { IBaseRepository } from "./IBaseRepository"
import { database } from "../lib/config/database"
import { UpdateOptions , DestroyOptions } from "sequelize"
import { Bookmark } from "../entity/BookmarkEntity"

export class BookmarkRepository implements IBaseRepository<Bookmark>
{
    bookmarkRepository = database.getRepository(Bookmark)

    async exists(id: number): Promise<boolean> 
    {
        return !!this.bookmarkRepository.findByPk(id)
    }

    async findById(id: number): Promise<Bookmark | any> 
    {
        return await this.bookmarkRepository.findByPk(id)
    }

    async create(item: Bookmark): Promise<Bookmark> 
    {
        return await this.bookmarkRepository.create(item)
    }

    async put(id: number, item: Bookmark): Promise<[affectedCount:number]> 
    {
        const options:UpdateOptions = 
        {
            where:{id:id},
            limit:1
        }
        return await this.bookmarkRepository.update(item,options)
    }

    async delete(id: number): Promise<number> 
    {
        const options:DestroyOptions = 
        {
            where:{id:id},
            limit:1
        }
        return await this.bookmarkRepository.destroy(options)
    }

    async findAll(): Promise<Bookmark[]> 
    {
        return await this.bookmarkRepository.findAll()
    }

}