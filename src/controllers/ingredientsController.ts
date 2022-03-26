import { Request, Response} from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { IngredientService } from "../service/IngredientService";
import { Ingredient } from "../entity/IngredientEntity";

export class IngredientsCtrl
{   
    constructor(){}

    async getAll(req:Request , res:Response)
    {
        const ingredientService = new IngredientService()

        try 
        {
            const ingredientsList = await ingredientService.getAllIngredients()
            res.status(200).send(ingredientsList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Ingredients : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    async getById(req:Request , res:Response)
    {
        let id:number
        const ingredientService = new IngredientService()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Ingredient Id is not a number")

            const ingredient = await ingredientService.getIngredientById(id)
            res.status(200).send(ingredient)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET Ingredient BY ID : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    async create(req:Request , res:Response)
    {
        const ingredientService = new IngredientService()

        try 
        {
            if( !isIngredient(req.body) ) throw Error("Ingredient object is malformed")
            const ingredient: Ingredient = req.body

            const result = await ingredientService.create(ingredient)
            res.status(201).send(result)
        } 
        catch (err:any) 
        {
            logger.error( `Method => POST Ingredient : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    async update(req:Request , res:Response)
    {
        let id:number
        const ingredientService = new IngredientService()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Ingredient Id is not a number")
            if( !isIngredient(req.body) ) throw Error("Ingredient object is malformed")
            const ingredient: Ingredient = req.body

            const result = await ingredientService.update(id,ingredient)
            res.status(202).send(result)
        } 
        catch (err:any) 
        {
            logger.error( `Method => PUT Ingredient : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }


    async delete(req:Request , res:Response)
    {
        let id:number
        const ingredientService = new IngredientService()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Ingredient Id is not a number")

            await ingredientService.delete(id)
            res.status(204).send(true)
        } 
        catch (err:any) 
        {
            logger.error( `Method => DELETE Ingredient : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }

}

export const isIngredient = (obj:any) => {
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
    obj.hasOwnProperty("quantity") 
    &&
    obj.hasOwnProperty("status") 
    &&
    obj.hasOwnProperty("image") )    return true
    else return false
}
