import { Request, Response} from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { RecipeServiceImpl } from "../service/Impl/RecipeServiceImpl";
import { Recipe } from "../entity/RecipeEntity";

/**
 * @classdesc Controller of brecipes
 */
export class RecipesCtrl
{   
    /**
     * Get All recipe
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {Recipe[]} Array of recipes
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    async getAll(req:Request , res:Response)
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
             * Get all recipes
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

    /**
     * Get All recipe with pagination
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {Recipe[]} Array of recipes
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    async getAllPagination(req:Request , res:Response)
    {
        let pageSize:number , offset:number

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
             * @param {string} req.params.pageSize
             */
            pageSize = parseInt(req.body.pageSize)

            /**
             * @param {string} req.params.pageSize
             * @param {string} req.params.pageIndex
             */
            offset = parseInt(req.body.pageIndex) * parseInt(req.body.pageSize)

            /**
             * @throws {Error} Limit is not a number
             */
            if( isNaN(pageSize) ) throw Error("Limit is not a number")

            /**
             * @throws {Error} Limit is not a number
             */
            if( isNaN(offset) ) throw Error("Offset is not a number")
            
            /**
             * Get all recipe
             * @typedef {Object} Recipe[]
             * @type {Recipe[]}
             * @function getAllRecipesPagination
             * @param {number} pageIndex
             * @param {number} pageSize
             */
            const recipesList:Recipe[] = await recipeServiceImpl.getAllRecipesPagination(pageSize,offset)
            res.status(200).send(recipesList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Recipes : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    /**
     * Get the size of All recipes array
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    async getAllSize(req:Request , res:Response)
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
             * Get number of recipes
             * @function getNumberElements
             */
            const size = await recipeServiceImpl.getNumberElements()
            res.status(200).send(size[0][0])
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Recipes size : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    } 


    /**
     * Get an recipe by id
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @typedef {Object} not_found
     * @throws {badRequest}
     * @throws {not_found} Recipe was not found in the database
     */
    async getById(req:Request , res:Response)
    {
        let id:number

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
             * @param {string} req.params.id
             */
            id = parseInt(req.params.id)

            /**
             * @throws {Error} Id is not a number
             */
            if( isNaN(id) ) throw Error("Recipe Id is not a number")

            
            /**
             * Get a recipe by its id
             * @typedef {Object} Recipe
             * @type {Recipe}
             * @function getRecipeById
             * @param {number} id
             */
            const recipe:Recipe = await recipeServiceImpl.getRecipeById(id)

            if( recipe ) res.status(200).send(recipe)
            else res.status(404).send( ApiError.not_found("There is no recipe with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET Recipe BY ID : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    /**
     * Get an recipe by id
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    async create(req:Request , res:Response)
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
             * @throws {Error} Object is malformed
             */
            if( !isRecipe(req.body) ) throw Error("Recipe object is malformed")

            /**
             * Request from client side
             */
            const recipe: Recipe = req.body

            /**
             * Add a Recipe
             * @typedef {Object} Recipe
             * @type {Recipe}
             * @function addRecipe
             * @param {Recipe} recipe
             */
            const result:Recipe = await recipeServiceImpl.addRecipe(recipe)
            res.status(201).send(result)
        } 
        catch (err:any) 
        {
            logger.error( `Method => POST Recipe : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    /**
     * Update a recipe
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} recipe is not found
     */
    async update(req:Request , res:Response)
    {
        let id:number

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
             * @param {string} req.params.id
             */
            id = parseInt(req.params.id)

            /**
             * @throws {Error} Id is not a number
             */
            if( isNaN(id) ) throw Error("Recipe Id is not a number")

            /**
             * @throws {Error} Object is malformed
             */
            if( !isRecipe(req.body) ) throw Error("Recipe object is malformed")

            /**
             * Request from client side
             */
            const recipe: Recipe = req.body

            /**
             * update a recipe
             * @typedef {Object} Recipe
             * @type {Recipe}
             * @function updateRecipe
             * @param {number} id
             * @param {Recipe} recipe
             */
            const result = await recipeServiceImpl.updateRecipe(id,recipe)

            if( result ) res.status(202).send(result)
            else res.status(404).send( ApiError.not_found("There is no recipe with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => PUT Recipe : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }


    /**
     * Delete a recipe
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} recipe is not found
     */
    async delete(req:Request , res:Response)
    {
        let id:number

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
             * @param {string} req.params.id
             */
            id = parseInt(req.params.id)

            /**
             * @throws {Error} Id is not a number
             */
            if( isNaN(id) ) throw Error("Recipe Id is not a number")

            /**
             * Delete a recipe
             * @function deleteRecipe
             * @param {number} id
             */
            await recipeServiceImpl.deleteRecipe(id)
            res.status(204).send(true)
        } 
        catch (err:any) 
        {
            logger.error( `Method => DELETE Recipe : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }

}


/**
 * 
 * @param obj 
 * @returns {boolean}
 */
const isRecipe = (obj:any): boolean => {
    if( obj.hasOwnProperty("title")
    && obj.hasOwnProperty("prep_time")
    && obj.hasOwnProperty("cooking_time")
    && obj.hasOwnProperty("rest_time")
    && obj.hasOwnProperty("categories")
    && obj.hasOwnProperty("ingredients_list")
    && obj.hasOwnProperty("serving_size")
    && obj.hasOwnProperty("instructions")
    && obj.hasOwnProperty("image")
    ) return true
    else return false
}
