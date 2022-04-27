import { IngredientBookmarkRepository } from "../../DAO/IngredientBookmarkRepository";
import { BookmarkIngredient } from "../../entity/BookmarkIngredientEntity";
import { IIngredientBookmarkService } from "../IIngredientBookmarkService";

export class IngredientBookmarkServiceImpl implements IIngredientBookmarkService
{
    ingredientBookmarkRepository: IngredientBookmarkRepository = new IngredientBookmarkRepository()

    async ingredientBookmarkExist(id: number): Promise<boolean> 
    {
        return this.ingredientBookmarkRepository.exists(id)
    }

    async getAllIngredientBookmarks(): Promise<BookmarkIngredient[]> 
    {
        return this.ingredientBookmarkRepository.findAll()
    }

    async updateOrCreateIngredientBookmark(id: number, item: BookmarkIngredient): Promise<BookmarkIngredient | [affectedCount: number]> 
    {
        return this.ingredientBookmarkRepository.updateOrCreate(id,item)
    }
}