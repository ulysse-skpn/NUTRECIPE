import { IBaseRepository } from "./IBaseRepository"
import { database } from "../lib/config/database"
import { UpdateOptions , DestroyOptions } from "sequelize"
import { Recipe } from "../entity/RecipeEntity"
import { BookmarkRecipe } from "../entity/BookmarkRecipeEntity"

export class RecipeRepository implements IBaseRepository<Recipe>
{
    recipeRepository = database.getRepository(Recipe)
    bookmarkRepository = database.getRepository(BookmarkRecipe)

    async exists(id: number): Promise<boolean> 
    {
        return !!this.recipeRepository.findByPk(id)
    }

    async findById(id: number): Promise<Recipe | any> 
    {
        return this.recipeRepository.findByPk(id
            ,
            {
                include:
                {
                    model:this.bookmarkRepository , as:"bookmarkRecipe"
                }
            }
        )
    }

    async create(item: Partial<Recipe>): Promise<Recipe> //?
    {
        return this.recipeRepository.create(item
            ,
            {
                include:
                {
                    model:this.bookmarkRepository , as:"bookmarkRecipe"
                }
            }
        )
    }

    async bulkCreate(item: Partial<Recipe>[]): Promise<Recipe[]> //?
    {
        return this.recipeRepository.bulkCreate(item
            ,
            {
                include:
                {
                    model:this.bookmarkRepository , as:"bookmarkRecipe"
                }
            }
        )
    }

    async put(id: number, item: Recipe): Promise<[affectedCount:number]> 
    {
        const options:UpdateOptions = 
        {
            where:{id:id},
            limit:1
        }
        return this.recipeRepository.update(item,options)
    }

    async delete(id: number): Promise<number> 
    {
        const options:DestroyOptions = 
        {
            where:{id:id},
            limit:1
        }
        return this.recipeRepository.destroy(options)
    }

    async findAll(): Promise<Recipe[]> 
    {
        return this.recipeRepository.findAll()
    }

    async findAllPagination(limit:number,offset:number): Promise<Recipe[]> 
    {
        return this.recipeRepository.findAll(
            {
                offset:offset,
                limit:limit,
                include:
                {
                    model:this.bookmarkRepository , as:"bookmarkRecipe"
                }
            }
        )
    }

}