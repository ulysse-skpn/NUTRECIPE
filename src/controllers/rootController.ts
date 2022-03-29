import { Request, Response } from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { RecipeServiceImpl } from "../service/Impl/RecipeServiceImpl";
import { Recipe } from "../entity/RecipeEntity";

export class RootCtrl
{
    async root(req:Request,res:Response)
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
}