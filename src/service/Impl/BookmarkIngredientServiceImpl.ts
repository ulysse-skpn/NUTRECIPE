import { BookmarkIngredientRepository } from "../../DAO/BookmarkIngredientRepository";
import { BookmarkIngredient } from "../../entity/BookmarkIngredientEntity";
import { IBookmarkIngredientService } from "../IBookmarkIngredientService";

export class BookmarkIngredientServiceImpl implements IBookmarkIngredientService
{
    bookmarkIngredientRepository: BookmarkIngredientRepository = new BookmarkIngredientRepository()

    async getAllIngredientBookmarks(): Promise<BookmarkIngredient[]> 
    {
        return this.bookmarkIngredientRepository.findAll()
    }

    async getIngredientBookmarkById(id: number): Promise<BookmarkIngredient | null> 
    {
        return this.bookmarkIngredientRepository.findById(id)
    }

    async updateOrCreateIngredientBookmark(id: number, item: BookmarkIngredient): Promise<BookmarkIngredient | [affectedCount: number]> 
    {
        return this.bookmarkIngredientRepository.updateOrCreate(id,item)
    }

}