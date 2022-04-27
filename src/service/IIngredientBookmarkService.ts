import { BookmarkIngredient } from "../entity/BookmarkIngredientEntity"

export interface IIngredientBookmarkService
{
    ingredientBookmarkExist(id:number): Promise<boolean>
    getAllIngredientBookmarks(): Promise<BookmarkIngredient[]>
    updateOrCreateIngredientBookmark(id:number,item:BookmarkIngredient): Promise<BookmarkIngredient | [affectedCount:number]> // number => Affected row
}