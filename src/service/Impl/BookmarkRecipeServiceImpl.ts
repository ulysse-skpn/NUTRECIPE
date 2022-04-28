import { BookmarkRecipeRepository } from "../../DAO/BookmarkRecipeRepository"
import { BookmarkRecipe } from "../../entity/BookmarkRecipeEntity"
import { IBookmarkRecipeService } from "../IBookmarkRecipeService"


export class BookmarkRecipeServiceImpl implements IBookmarkRecipeService
{
    bookmarkIngredientRepository: BookmarkRecipeRepository = new BookmarkRecipeRepository()

    async getAllRecipeBookmarks(): Promise<BookmarkRecipe[]> 
    {
        return this.bookmarkIngredientRepository.findAll()
    }

    async getRecipeBookmarkById(id: number): Promise<BookmarkRecipe | null> 
    {
        return this.bookmarkIngredientRepository.findById(id)
    }

    async updateOrCreateRecipeBookmark(id: number, item: BookmarkRecipe): Promise<BookmarkRecipe | [affectedCount: number]> 
    {
        return this.bookmarkIngredientRepository.updateOrCreate(id,item)
    }

}