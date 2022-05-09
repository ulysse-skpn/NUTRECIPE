import { Request, Response } from "express";
import { BookmarkRecipe } from "../entity/BookmarkRecipeEntity";
import { ApiError } from "../handlers/ApiError";
import { logger } from "../lib/config/winston";
import { BookmarkRecipeServiceImpl } from "../service/Impl/BookmarkRecipeServiceImpl";

/**
 * @classdesc Controller of bookmark of type recipe
 */
export class BookmarkRecipeCtrl
{
    /**
     * Get All bookmarks (recipe)
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {BookmarkRecipe[]} Array of bookmarks (recipe)
     * @throws {badRequest}
     */
    async getAll(req:Request , res:Response)
    {
        /**
         * instantiate bookmarkRecipe service implementation
         * @typedef {Object} BookmarkRecipeServiceImpl
         * @type {BookmarkRecipeServiceImpl}
         * @class
         * @instance
         */
        const bookmarkServiceImpl:BookmarkRecipeServiceImpl = new BookmarkRecipeServiceImpl()

        try 
        {
            /**
             * List of all bookmarks (recipe)
             * @typedef {Object} BookmarkRecipe[]
             * @type {BookmarkRecipe[]}
             */
            const bookmarksList:BookmarkRecipe[] = await bookmarkServiceImpl.getAllRecipeBookmarks()
            res.status(200).send(bookmarksList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Recipe Bookmarks : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }

    async updateOrCreate(req:Request , res:Response)
    {   
        let id:number

        /**
         * instantiate bookmarkRecipe service implementation
         * @typedef {Object} BookmarkRecipeServiceImpl
         * @type {BookmarkRecipeServiceImpl}
         * @class
         * @instance
         */
        const bookmarkServiceImpl:BookmarkRecipeServiceImpl = new BookmarkRecipeServiceImpl()

        try 
        {
            /**
             * @param {string} req.params.id
             */
            id = parseInt(req.params.id)

            /**
             * @throws {Error} Id is not a number
             */
            if( isNaN(id) ) throw Error("Bookmark Id is not a number")

            /**
             * @throws {Error} Object is malformed
             */
            if( !isBookmark(req.body) ) throw Error("Bookmark object is malformed")

            /**
             * Request from client side
             * @typedef {Object} BookmarkRecipe
             * @type {BookmarkRecipe}
             */
            const bookmark: BookmarkRecipe = req.body
            
            /**
             * Update a bookmark or create a bookmark if it doesn't exist
             * @typedef {Object} BookmarkRecipe[]
             * @type {BookmarkRecipe[]}
             * @function updateOrCreateRecipeBookmark
             * @param {number} id
             * @param {BookmarkRecipe} bookmark
             */
            const result = await bookmarkServiceImpl.updateOrCreateRecipeBookmark(id,bookmark)

            if( result ) res.status(202).send(result)
            else res.status(404).send( ApiError.not_found("There is no bookmark with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => PUT Recipe Bookmarks : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }
}

/**
 * 
 * @param obj 
 * @returns {boolean}
 */
const isBookmark = (obj:any): boolean => {
    if( obj.hasOwnProperty("recipeId")
    && obj.hasOwnProperty("userId")
    && obj.hasOwnProperty("saved")
    ) return true
    else return false
}