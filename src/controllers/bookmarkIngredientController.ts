import { Request, Response } from "express";
import { BookmarkIngredient } from "../entity/BookmarkIngredientEntity";
import { ApiError } from "../handlers/ApiError";
import { logger } from "../lib/config/winston";
import { BookmarkIngredientServiceImpl } from "../service/Impl/BookmarkIngredientServiceImpl";

/**
 * @classdesc Controller of bookmark of type ingredient
 */
export class BookmarkIngredientCtrl
{
    /**
     * Get All bookmarks (ingredient)
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {BookmarkIngredient[]} Array of bookmarks (ingredient)
     * @throws {badRequest}
     */
    async getAll(req:Request , res:Response)
    {
        /**
         * instantiate bookmarkIngredient service implementation
         * @typedef {Object} BookmarkIngredientServiceImpl
         * @type {BookmarkIngredientServiceImpl}
         * @class
         * @instance
         */
        const bookmarkServiceImpl:BookmarkIngredientServiceImpl = new BookmarkIngredientServiceImpl()

        try 
        {
            /**
             * List of all bookmarks (ingredient)
             * @typedef {Object} BookmarkIngredient[]
             * @type {BookmarkIngredient[]}
             */
            const bookmarksList:BookmarkIngredient[] = await bookmarkServiceImpl.getAllIngredientBookmarks()
            res.status(200).send(bookmarksList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Ingredient Bookmarks : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }

    /**
     * Update a bookmark (ingredient)
     * @async
     * @method
     * @typedef {Object} BookmarkIngredient
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {(number|BookmarkIngredient)} affected count | Bookmark of ingredient
     * @throws {not_found} When the bookmark is not found (ingredient)
     */
    async updateOrCreate(req:Request , res:Response)
    {

        let id:number

        /**
         * instantiate bookmarkIngredient service implementation
         * @typedef {Object} BookmarkIngredientServiceImpl
         * @type {BookmarkIngredient}
         * @class
         * @instance
         */
        const bookmarkServiceImpl:BookmarkIngredientServiceImpl = new BookmarkIngredientServiceImpl()

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
             * @typedef {Object} BookmarkIngredient
             * @type {BookmarkIngredient}
             */
            const bookmark: BookmarkIngredient = req.body
            
            /**
             * Update a bookmark or create a bookmark if it doesn't exist
             * @typedef {Object} BookmarkIngredient[]
             * @type {BookmarkIngredient[]}
             * @function updateOrCreateIngredientBookmark
             * @param {number} id
             * @param {BookmarkIngredient} bookmark
             */
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

/**
 * 
 * @param obj 
 * @returns {boolean}
 */
const isBookmark = (obj:any) => {
    if( obj.hasOwnProperty("ingredientId")
    && obj.hasOwnProperty("userId")
    && obj.hasOwnProperty("saved")
    ) return true
    else return false
}