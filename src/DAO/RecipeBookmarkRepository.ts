import { Optional, UpdateOptions } from "sequelize";
import { BookmarkRecipe } from "../entity/BookmarkRecipeEntity";
import { Recipe } from "../entity/RecipeEntity";
import { database } from "../lib/config/database";
import { IBookmarkRepository } from "./IBookmarkRepository";

export class RecipeBookmarkRepository implements IBookmarkRepository<BookmarkRecipe>
{
    recipeRepository = database.getRepository(Recipe)
    recipeBookmarkRepository = database.getRepository(BookmarkRecipe)

    async exists(id: number): Promise<boolean> 
    {
        return !!this.recipeBookmarkRepository.findByPk(id)
    }

    async findAll(): Promise<BookmarkRecipe[]> 
    {
        return this.recipeBookmarkRepository.findAll(
            {
                include:
                {
                    model:this.recipeRepository
                }
            }
        )
    }


    async updateOrCreate(id: number, item: Partial<BookmarkRecipe>): Promise<BookmarkRecipe | [affectedCount:number]> 
    {
        const foundItem = await this.recipeBookmarkRepository.findOne({where:{recipeId:id}})

        if( !foundItem )
        {
            return this.recipeBookmarkRepository.create(item)
        }
        
        const options:UpdateOptions = 
        {
            where: {recipeId:id}
        }
        
        return this.recipeBookmarkRepository.update(item,options)
    }
}