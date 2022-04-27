import { RecipeBookmarkRepository } from "../../DAO/RecipeBookmarkRepository"
import { BookmarkRecipe } from "../../entity/BookmarkRecipeEntity"
import { IRecipeBookmarkService } from "../IRecipeBookmarkService"


export class RecipeBookmarkServiceImpl implements IRecipeBookmarkService
{
    recipeBookmarkRepository: RecipeBookmarkRepository = new RecipeBookmarkRepository()

    async recipeBookmarkExist(id: number): Promise<boolean> 
    {
        return this.recipeBookmarkRepository.exists(id)
    }

    async getAllRecipeBookmarks(): Promise<BookmarkRecipe[]> 
    {
        return this.recipeBookmarkRepository.findAll()
    }

    async updateOrCreateRecipeBookmark(id: number, item: BookmarkRecipe): Promise<BookmarkRecipe | [affectedCount: number]> 
    {        
        return this.recipeBookmarkRepository.updateOrCreate(id,item)
    }
}