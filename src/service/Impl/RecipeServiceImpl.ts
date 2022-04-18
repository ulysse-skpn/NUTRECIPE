import { RecipeRepository } from "../../DAO/RecipeRepository";
import { Recipe } from "../../entity/RecipeEntity";
import { database } from "../../lib/config/database";
import { IRecipeService } from "../IRecipeService";

export class RecipeServiceImpl implements IRecipeService
{
    recipeRepository : RecipeRepository = new RecipeRepository()

    async recipeExist(id: number): Promise<boolean>
    {
        return this.recipeRepository.exists(id)
    }

    async getAllRecipes(): Promise<Recipe[]>
    {
        return this.recipeRepository.findAll()
    }

    async getAllRecipesPagination(limit:number , offset:number): Promise<Recipe[]>
    {
        return this.recipeRepository.findAllPagination(limit,offset)
    }

    async getRecipeById(id: number): Promise<Recipe>
    {
        return this.recipeRepository.findById(id)
    }

    async addRecipe(item: Recipe): Promise<Recipe>
    {
        return this.recipeRepository.create(item)
    }

    async updateRecipe(id: number, item: Recipe): Promise<[affectedcount:number]>
    {
        return this.recipeRepository.put(id,item)
    }

    async deleteRecipe(id: number): Promise<number>
    {
        return this.recipeRepository.delete(id)
    }
    
    async getNumberElements()
    {
        return database.query("SELECT COUNT(id) as nbElem FROM `recipes`");
    }
}