import { Request, Response } from "express";
import { BookmarkRecipe } from "../entity/BookmarkRecipeEntity";
import { ApiError } from "../handlers/ApiError";
import { logger } from "../lib/config/winston";
import { RecipeBookmarkServiceImpl } from "../service/Impl/RecipeBookmarkServiceImpl";

export class RecipeBookmarksCtrl
{
    async getAll(req:Request , res:Response)
    {
        const recipeBookmarkServiceimpl: RecipeBookmarkServiceImpl = new RecipeBookmarkServiceImpl()

        try 
        {
            const bookmarkList:BookmarkRecipe[] = await recipeBookmarkServiceimpl.getAllRecipeBookmarks()
            res.status(200).send(bookmarkList)
        } 
        catch (err:any) 
        {
            logger.error(`Method => GET ALL Recipe Bookmarks : ${err.message}`)
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }

    async updateOrCreate(req:Request , res:Response)
    {
        let id:number
        const recipeBookmarkServiceimpl: RecipeBookmarkServiceImpl = new RecipeBookmarkServiceImpl()
        
        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Bookmark Id is not a number")
            if( !isBookmark(req.body) ) throw Error("Bookmark object is malformed")
            const bookmark: BookmarkRecipe = req.body
            
            const result = await recipeBookmarkServiceimpl.updateOrCreateRecipeBookmark(id,bookmark)

            if( result ) res.status(202).send(result)
            else res.status(404).send( ApiError.not_found("There is no bookmark with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => PUT Recipe Bookmark : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }
}

const isBookmark = (obj:any) => {
    if( obj.hasOwnProperty("recipeId")
    && obj.hasOwnProperty("saved")
    ) return true
    else return false
}