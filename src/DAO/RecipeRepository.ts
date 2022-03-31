import { IBaseRepository } from "./IBaseRepository"
import { database } from "../lib/config/database"
import { UpdateOptions , DestroyOptions } from "sequelize"
import { Recipe } from "../entity/RecipeEntity"
import { Ingredient } from "../entity/IngredientEntity"
import { Bookmark } from "../entity/BookmarkEntity"

export class RecipeRepository implements IBaseRepository<Recipe>
{
    recipeRepository = database.getRepository(Recipe)
    ingredientRepository = database.getRepository(Ingredient)
    bookmarkRepository = database.getRepository(Bookmark)

    async exists(id: number): Promise<boolean> 
    {
        return !!this.recipeRepository.findByPk(id)
    }

    async findById(id: number): Promise<Recipe | any> 
    {
        return this.recipeRepository.findByPk(id , 
            {
                include:
                [
                    {
                        model:this.ingredientRepository, as:"recipe_has_ingredients"
                    }
                ]
            }
        )
    }

    async create(item: Recipe): Promise<Recipe> 
    {
        return this.recipeRepository.create(item ,
            {
                include:
                [
                    {
                        model:this.ingredientRepository, as:"recipe_has_ingredients"
                    }
                ]
            }
        )
    }

    async bulkCreate(item: Recipe[]): Promise<Recipe[]> 
    {
        return this.recipeRepository.bulkCreate(item,
            {
                include:
                [
                    {
                        model:this.ingredientRepository, as:"recipe_has_ingredients"
                    }
                ]
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
        return this.recipeRepository.findAll(
            {
                include:
                [
                    {
                        model:this.ingredientRepository, as:"recipe_has_ingredients"
                    }
                ]
            }
        )
    }

}