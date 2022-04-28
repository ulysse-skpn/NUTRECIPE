import { BookmarkRecipe } from "../entity/BookmarkRecipeEntity"


export interface IBookmarkRecipeService
{
    getAllRecipeBookmarks(): Promise<BookmarkRecipe[]>
    getRecipeBookmarkById(id:number): Promise<BookmarkRecipe | null>
    updateOrCreateRecipeBookmark(id:number,item:BookmarkRecipe): Promise<BookmarkRecipe | [affectedCount:number]> // number => Affected row
}