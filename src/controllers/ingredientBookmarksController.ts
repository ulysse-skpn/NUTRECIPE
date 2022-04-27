import { Request, Response } from "express";
import { BookmarkIngredient } from "../entity/BookmarkIngredientEntity";
import { ApiError } from "../handlers/ApiError";
import { logger } from "../lib/config/winston";
import { IngredientBookmarkServiceImpl } from "../service/Impl/IngredientBookmarkServiceImpl";

export class IngredientBookmarksCtrl
{
    async getAll(req:Request , res:Response)
    {
        const ingredientBookmarkServiceImpl: IngredientBookmarkServiceImpl = new IngredientBookmarkServiceImpl()

        try 
        {
            const bookmarkList:BookmarkIngredient[] = await ingredientBookmarkServiceImpl.getAllIngredientBookmarks()
            res.status(200).send(bookmarkList)
        } 
        catch (err:any) 
        {
            logger.error(`Method => GET ALL Ingredient Bookmarks : ${err.message}`)
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }

    async updateOrCreate(req:Request , res:Response)
    {
        let id:number
        const ingredientBookmarkServiceImpl: IngredientBookmarkServiceImpl = new IngredientBookmarkServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Bookmark Id is not a number")
            if( !isBookmark(req.body) ) throw Error("Bookmark object is malformed")
            const bookmark: BookmarkIngredient = req.body
            
            const result = await ingredientBookmarkServiceImpl.updateOrCreateIngredientBookmark(id,bookmark)

            if( result ) res.status(202).send(result)
            else res.status(404).send( ApiError.not_found("There is no bookmark with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => PUT Ingredient Bookmark : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }
}

const isBookmark = (obj:any) => {
    if( obj.hasOwnProperty("ingredientId")
    && obj.hasOwnProperty("saved")
    ) return true
    else return false
}