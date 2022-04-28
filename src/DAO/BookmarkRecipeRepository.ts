import { UpdateOptions } from "sequelize";
import { BookmarkRecipe } from "../entity/BookmarkRecipeEntity";
import { Recipe } from "../entity/RecipeEntity";
import { database } from "../lib/config/database";
import { IBookmarkRepository } from "./IBookmarkRepository";

export class BookmarkRecipeRepository implements IBookmarkRepository<BookmarkRecipe>
{

    recipeRepository = database.getRepository(Recipe)
    bookmarkRepository = database.getRepository(BookmarkRecipe)

    async findAll(): Promise<BookmarkRecipe[]> 
    {
        return this.bookmarkRepository.findAll(
            {
                include:
                {
                    model:this.recipeRepository
                }
            }
        )
    }

    async findById(id: number): Promise<BookmarkRecipe | null> 
    {
        return this.bookmarkRepository.findOne({where:{recipeId:id}
            ,
            include:
            {
                model:this.recipeRepository
            }
        })
    }

    async updateOrCreate(id: number, item: Partial<BookmarkRecipe>): Promise<BookmarkRecipe | [affectCount: number]> 
    {
        const foundItem = await this.bookmarkRepository.findOne({where:{recipeId:id}
            ,
            include:
            {
                model:this.recipeRepository
            }
        })
        
        
        if( !foundItem )
        {
            return this.bookmarkRepository.create(item)
        }
        
        const options:UpdateOptions = 
        {
            where: {recipeId:id}
        }
        
        return this.bookmarkRepository.update(item,options)
    }


}