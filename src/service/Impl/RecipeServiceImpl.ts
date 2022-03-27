import { RecipeRepository } from "../../DAO/RecipeRepository";
import { Recipe } from "../../entity/RecipeEntity";
import { IRecipeService } from "../IRecipeService";

export class RecipeServiceImpl implements IRecipeService
{
    recipeRepository : RecipeRepository = new RecipeRepository()

    constructor(){}

    async recipeExist(id: number): Promise<boolean>
    {
        return this.recipeRepository.exists(id)
    }

    async getAllRecipes(): Promise<Recipe[]>
    {
        return this.recipeRepository.findAll()
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
    
}