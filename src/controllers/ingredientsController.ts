import { Request, Response} from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { IngredientServiceImpl } from "../service/Impl/IngredientServiceImpl";
import { Ingredient } from "../entity/IngredientEntity";

/**
 * @classdesc Controller of ingredients
 */
export class IngredientsCtrl
{   
    /**
     * Get All ingredients
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {Ingredient[]} Array of ingredients
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    async getAll(req:Request , res:Response)
    {
        let pageSize:number , offset:number

        /**
         * instantiate ingredient service implementation
         * @typedef {Object} IngredientServiceImpl
         * @type {IngredientServiceImpl}
         * @class
         * @instance
         */
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

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
             * @throws {Error} Offset is not a number
             */
            if( isNaN(offset) ) throw Error("Offset is not a number")

            /**
             * Get all ingredients
             * @typedef {Object} Ingredient[]
             * @type {Ingredient[]}
             * @function getAllIngredients
             * @param {number} pageIndex
             * @param {number} pageSize
             */
            const ingredientsList:Ingredient[] = await ingredientServiceImpl.getAllIngredients(pageSize,offset)
            res.status(200).send(ingredientsList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => POST Pagination Ingredients : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }

    /**
     * Get the size of All ingredients array
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
         * instantiate ingredient service implementation
         * @typedef {Object} IngredientServiceImpl
         * @type {IngredientServiceImpl}
         * @class
         * @instance
         */
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

        try 
        {
            /**
             * Get number of ingredients
             * @function getNumberElements
             */
            const size = await ingredientServiceImpl.getNumberElements()
            res.status(200).send(size[0][0])
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Ingredients size : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }   

    /**
     * Get an ingredient by id
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @typedef {Object} not_found
     * @throws {badRequest}
     * @throws {not_found} Ingredient was not found in the database
     */
    async getById(req:Request , res:Response)
    {
        let id:number

        /**
         * instantiate Ingredient service implementation
         * @typedef {Object} IngredientServiceImpl
         * @type {IngredientServiceImpl}
         * @class
         * @instance
         */
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

        try 
        {
            /**
             * @param {string} req.params.id
             */
            id = parseInt(req.params.id)

            /**
             * @throws {Error} Id is not a number
             */
            if( isNaN(id) ) throw Error("Ingredient Id is not a number")

            /**
             * Get a ingrdient by its id
             * @typedef {Object} Ingredient
             * @type {Ingredient}
             * @function getIngredientById
             * @param {number} id
             */
            const ingredient:Ingredient = await ingredientServiceImpl.getIngredientById(id)

            if( ingredient ) res.status(200).send(ingredient)
            else res.status(404).send( ApiError.not_found("There is no ingredient with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET Ingredient BY ID : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    /**
     * Get create an ingredient
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
         * instantiate Ingredient service implementation
         * @typedef {Object} IngredientServiceImpl
         * @type {IngredientServiceImpl}
         * @class
         * @instance
         */
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

        try 
        {
            /**
             * @throws {Error} Object is malformed
             */
            if( !isIngredient(req.body) ) throw Error("Ingredient object is malformed")

            /**
             * Request from client side
             */
            const ingredient: Ingredient = req.body

            /**
             * Add an ingredient
             * @typedef {Object} Ingredient
             * @type {Ingredient}
             * @function addIngredient
             * @param {Ingredient} ingredient
             */
            const result:Ingredient = await ingredientServiceImpl.addIngredient(ingredient)
            res.status(201).send(result)
        } 
        catch (err:any) 
        {
            logger.error( `Method => POST Ingredient : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    /**
     * Update an ingredient
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} ingredient is not found
     */
    async update(req:Request , res:Response)
    {
        let id:number

        /**
         * instantiate Ingredient service implementation
         * @typedef {Object} IngredientServiceImpl
         * @type {IngredientServiceImpl}
         * @class
         * @instance
         */
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

        try 
        {
            /**
             * @param {string} req.params.id
             */
            id = parseInt(req.params.id)

            /**
             * @throws {Error} Id is not a number
             */
            if( isNaN(id) ) throw Error("Ingredient Id is not a number")

            /**
             * @throws {Error} Object is malformed
             */
            if( !isIngredient(req.body) ) throw Error("Ingredient object is malformed")
            
            /**
             * Request from client side
             */
            const ingredient: Ingredient = req.body

            /**
             * Update an ingredient
             * @type {[affectedCount:number]}
             * @function updateIngredient
             * @param {number} id
             * @param {number} ingredient
             */
            const result: [affectedCount: number] = await ingredientServiceImpl.updateIngredient(id,ingredient)

            if( result ) res.status(202).send(result)
            else res.status(404).send( ApiError.not_found("There is no ingredient with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => PUT Ingredient : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }


    /**
     * Delete an ingredient
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} ingredient is not found
     */
    async delete(req:Request , res:Response)
    {
        let id:number

        /**
         * instantiate Ingredient service implementation
         * @typedef {Object} IngredientServiceImpl
         * @type {IngredientServiceImpl}
         * @class
         * @instance
         */
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

        try 
        {
            /**
             * @param {string} req.params.id
             */
            id = parseInt(req.params.id)

            /**
             * @throws {Error} Id is not a number
             */
            if( isNaN(id) ) throw Error("Ingredient Id is not a number")

            /**
             * Delete an ingredient
             * @function deleteIngredient
             * @param {number} id
             */
            await ingredientServiceImpl.deleteIngredient(id)
            res.status(204).send(true)
        } 
        catch (err:any) 
        {
            logger.error( `Method => DELETE Ingredient : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }

}


/**
 * 
 * @param obj 
 * @returns {boolean}
 */
const isIngredient = (obj:any): boolean => {
    if( obj.hasOwnProperty("product_name")
    &&
    obj.hasOwnProperty("ingredient_text")
    &&
    obj.hasOwnProperty("carbohydrates")
    &&
    obj.hasOwnProperty("proteins") 
    &&
    obj.hasOwnProperty("fats")
    &&
    obj.hasOwnProperty("salt") 
    &&
    obj.hasOwnProperty("calories")
    &&
    obj.hasOwnProperty("nova_group") 
    &&
    obj.hasOwnProperty("categories")
    &&
    obj.hasOwnProperty("serving_size")
    &&
    obj.hasOwnProperty("image") )    return true
    else return false
}
