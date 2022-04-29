import { Ingredient } from "../entity/IngredientEntity"
import { IBaseRepository } from "./IBaseRepository"
import { database } from "../lib/config/database"
import { UpdateOptions , DestroyOptions } from "sequelize"
import { BookmarkIngredient } from "../entity/BookmarkIngredientEntity"

export class IngredientRepository implements IBaseRepository<Ingredient>
{
    ingredientRepository = database.getRepository(Ingredient)
    bookmarkRepository = database.getRepository(BookmarkIngredient)

    async exists(id: number): Promise<boolean> 
    {
        return !!this.ingredientRepository.findByPk(id)
    }

    async findById(id: number): Promise<Ingredient | any> 
    {
        return this.ingredientRepository.findByPk(id
            ,
            {
                include:
                {
                    model:this.bookmarkRepository , as:"bookmarkIngredient"
                }
            }
        )
    }

    async create(item: Partial<Ingredient>): Promise<Ingredient> //?
    {
        return this.ingredientRepository.create(item
            ,
            {
                include:
                {
                    model:this.bookmarkRepository , as:"bookmarkIngredient"
                }
            }
        )
    }

    async bulkCreate(item: Partial<Ingredient>[]): Promise<Ingredient[]> //?
    {
        return this.ingredientRepository.bulkCreate(item
            ,
            {
                include:
                {
                    model:this.bookmarkRepository , as:"bookmarkIngredient"
                }
            }
        )
    }

    async put(id: number, item: Ingredient): Promise<[affectedCount:number]> 
    {
        const options:UpdateOptions = 
        {
            where:{ingredientId:id},
            limit:1
        }
        return this.ingredientRepository.update(item,options)
    }

    async delete(id: number): Promise<number> 
    {
        const options:DestroyOptions = 
        {
            where:{ingredientId:id},
            limit:1
        }
        return this.ingredientRepository.destroy(options)
    }

    async findAll(limit:number,offset:number): Promise<Ingredient[]> 
    {
        return this.ingredientRepository.findAll({
            offset:offset,
            limit:limit,
            include:
            {
                model:this.bookmarkRepository , as:"bookmarkIngredient"
            }
        })
    }

}