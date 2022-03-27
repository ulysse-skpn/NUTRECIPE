import { Recipe } from "../entity/RecipeEntity"

export interface IRecipeService
{
    recipeExist(id:number): Promise<boolean>
    getAllRecipes(): Promise<Recipe[]>
    getRecipeById(id:number): Promise<Recipe>
    addRecipe(item:Recipe): Promise<Recipe>
    updateRecipe(id:number,item:Recipe): Promise<[affectedCount:number]> // number => Affected row
    deleteRecipe(id:number): Promise<number>
}