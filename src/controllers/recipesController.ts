import { Request, Response} from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { RecipeServiceImpl } from "../service/Impl/RecipeServiceImpl";
import { Recipe } from "../entity/RecipeEntity";

export class RecipesCtrl
{   
    async getAll(req:Request , res:Response)
    {
        const recipeServiceImpl:RecipeServiceImpl = new RecipeServiceImpl()

        try 
        {            
            const recipesList:Recipe[] = await recipeServiceImpl.getAllRecipes()
            res.status(200).send(recipesList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Recipes : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    async getAllSize(req:Request , res:Response)
    {
        const recipeServiceImpl:RecipeServiceImpl = new RecipeServiceImpl()

        try 
        {
            const size = await recipeServiceImpl.getNumberElements()
            res.status(200).send(size[0][0])
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Recipes size : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    } 


    async getById(req:Request , res:Response)
    {
        let id:number
        const recipeServiceImpl:RecipeServiceImpl = new RecipeServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Recipe Id is not a number")

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


    async create(req:Request , res:Response)
    {
        const recipeServiceImpl:RecipeServiceImpl = new RecipeServiceImpl()

        try 
        {
            if( !isRecipe(req.body) ) throw Error("Recipe object is malformed")
            const recipe: Recipe = req.body

            const result:Recipe = await recipeServiceImpl.addRecipe(recipe)
            res.status(201).send(result)
        } 
        catch (err:any) 
        {
            logger.error( `Method => POST Recipe : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    async update(req:Request , res:Response)
    {
        let id:number
        const recipeServiceImpl:RecipeServiceImpl = new RecipeServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Recipe Id is not a number")
            if( !isRecipe(req.body) ) throw Error("Recipe object is malformed")

            const recipe: Recipe = req.body

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


    async delete(req:Request , res:Response)
    {
        let id:number
        const recipeServiceImpl:RecipeServiceImpl = new RecipeServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Recipe Id is not a number")

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

export const isRecipe = (obj:any) => {
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
