import { Request, Response } from "express";
import { BookmarkIngredient } from "../entity/BookmarkIngredientEntity";
import { ApiError } from "../handlers/ApiError";
import { logger } from "../lib/config/winston";
import { BookmarkIngredientServiceImpl } from "../service/Impl/BookmarkIngredientServiceImpl";

export class BookmarkIngredientCtrl
{
    async getAll(req:Request , res:Response)
    {
        const bookmarkServiceImpl:BookmarkIngredientServiceImpl = new BookmarkIngredientServiceImpl()

        try 
        {
            const bookmarksList:BookmarkIngredient[] = await bookmarkServiceImpl.getAllIngredientBookmarks()
            res.status(200).send(bookmarksList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Ingredient Bookmarks : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }

    async updateOrCreate(req:Request , res:Response)
    {
        let id:number
        const bookmarkServiceImpl:BookmarkIngredientServiceImpl = new BookmarkIngredientServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Bookmark Id is not a number")
            if( !isBookmark(req.body) ) throw Error("Bookmark object is malformed")
            const bookmark: BookmarkIngredient = req.body
            
            const result = await bookmarkServiceImpl.updateOrCreateIngredientBookmark(id,bookmark)

            if( result ) res.status(202).send(result)
            else res.status(404).send( ApiError.not_found("There is no bookmark with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => PUT Ingredient Bookmarks : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }
}

const isBookmark = (obj:any) => {
    if( obj.hasOwnProperty("ingredientId")
    && obj.hasOwnProperty("userId")
    && obj.hasOwnProperty("saved")
    ) return true
    else return false
}