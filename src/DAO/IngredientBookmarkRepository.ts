import { UpdateOptions } from "sequelize";
import { BookmarkIngredient } from "../entity/BookmarkIngredientEntity";
import { Ingredient } from "../entity/IngredientEntity";
import { database } from "../lib/config/database";
import { IBookmarkRepository } from "./IBookmarkRepository";

export class IngredientBookmarkRepository implements IBookmarkRepository<BookmarkIngredient>
{
    ingredientRepository = database.getRepository(Ingredient)
    ingredientBookmarkRepository = database.getRepository(BookmarkIngredient)

    async exists(id: number): Promise<boolean> 
    {
        return !!this.ingredientBookmarkRepository.findByPk(id)
    }

    async findAll(): Promise<BookmarkIngredient[]> 
    {
        return this.ingredientBookmarkRepository.findAll(
            {
                include:
                {
                    model:this.ingredientRepository
                }
            }
        )
    }


    async updateOrCreate(id: number, item: Partial<BookmarkIngredient> ): Promise<BookmarkIngredient | [affectedCount:number]> 
    {
        const foundItem = await this.ingredientBookmarkRepository.findOne({where:{ingredientId:id}})

        if( !foundItem )
        {
            return this.ingredientBookmarkRepository.create(item)
        }
        
        const options:UpdateOptions = 
        {
            where: {ingredientId:id}
        }
        
        return this.ingredientBookmarkRepository.update(item,options)
    }
}