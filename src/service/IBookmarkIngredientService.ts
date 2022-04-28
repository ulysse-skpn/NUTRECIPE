import { BookmarkIngredient } from "../entity/BookmarkIngredientEntity"


export interface IBookmarkIngredientService
{
    getAllIngredientBookmarks(): Promise<BookmarkIngredient[]>
    getIngredientBookmarkById(id:number): Promise<BookmarkIngredient | null>
    updateOrCreateIngredientBookmark(id:number,item:BookmarkIngredient): Promise<BookmarkIngredient | [affectedCount:number]> // number => Affected row
}