import { Request, Response } from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { RecipeServiceImpl } from "../service/Impl/RecipeServiceImpl";
import { Recipe } from "../entity/RecipeEntity";

/**
 * @classdesc Controller of root page : it retrieves all recipe for displaying them on the home screen of the application
 */
export class RootCtrl
{
    /**
     * Get All Recipes
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {Recipe[]} Array of recipes
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    async root(req:Request,res:Response)
    {
        /**
         * instantiate recipe service implementation
         * @typedef {Object} RecipeServiceImpl
         * @type {RecipeServiceImpl}
         * @class
         * @instance
         */
        const recipeServiceImpl:RecipeServiceImpl = new RecipeServiceImpl()

        try 
        {
            /**
             * List of all recipes
             * @typedef {Object} Recipe[]
             * @type {Recipe[]}
             * @function getAllRecipes
             */
            const recipesList:Recipe[] = await recipeServiceImpl.getAllRecipes()
            res.status(200).send(recipesList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Recipes : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }
}