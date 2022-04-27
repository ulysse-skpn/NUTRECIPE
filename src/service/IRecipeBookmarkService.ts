import { BookmarkRecipe } from "../entity/BookmarkRecipeEntity"

export interface IRecipeBookmarkService
{
    recipeBookmarkExist(id:number): Promise<boolean>
    getAllRecipeBookmarks(): Promise<BookmarkRecipe[]>
    updateOrCreateRecipeBookmark(id:number,item:BookmarkRecipe): Promise<BookmarkRecipe | [affectedCount:number]> // number => Affected row
}