import { Ingredient } from "../entity/IngredientEntity";

export interface IIngredientService
{
    ingredientExist(id:number): Promise<boolean>
    getAllIngredients(limit:number,offset:number): Promise<Ingredient[]>
    getIngredientById(id:number): Promise<Ingredient>
    addIngredient(item:Ingredient): Promise<Ingredient>
    updateIngredient(id:number,item:Ingredient): Promise<[affectedCount:number]> // number => Affected row
    deleteIngredient(id:number): Promise<number>
}