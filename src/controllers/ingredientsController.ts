import { Request, Response} from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { IngredientServiceImpl } from "../service/Impl/IngredientServiceImpl";
import { Ingredient } from "../entity/IngredientEntity";

export class IngredientsCtrl
{   
    async getAll(req:Request , res:Response)
    {
        let pageSize:number , offset:number
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

        try 
        {
            pageSize = parseInt(req.body.pageSize)
            offset = parseInt(req.body.pageIndex) * parseInt(req.body.pageSize)
            if( isNaN(pageSize) ) throw Error("Limit is not a number")
            if( isNaN(offset) ) throw Error("Offset is not a number")

            const ingredientsList:Ingredient[] = await ingredientServiceImpl.getAllIngredients(pageSize,offset)
            res.status(200).send(ingredientsList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Ingredients : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }

    async getAllSize(req:Request , res:Response)
    {
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

        try 
        {
            const size = await ingredientServiceImpl.getNumberElements()
            res.status(200).send(size[0][0])
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Ingredients size : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }   


    async getById(req:Request , res:Response)
    {
        let id:number
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Ingredient Id is not a number")

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


    async create(req:Request , res:Response)
    {
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

        try 
        {
            if( !isIngredient(req.body) ) throw Error("Ingredient object is malformed")
            const ingredient: Ingredient = req.body

            const result:Ingredient = await ingredientServiceImpl.addIngredient(ingredient)
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
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Ingredient Id is not a number")
            if( !isIngredient(req.body) ) throw Error("Ingredient object is malformed")
            
            const ingredient: Ingredient = req.body

            const result = await ingredientServiceImpl.updateIngredient(id,ingredient)

            if( result ) res.status(202).send(result)
            else res.status(404).send( ApiError.not_found("There is no ingredient with this id") )
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
        const ingredientServiceImpl:IngredientServiceImpl = new IngredientServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Ingredient Id is not a number")

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
    obj.hasOwnProperty("image") )    return true
    else return false
}
