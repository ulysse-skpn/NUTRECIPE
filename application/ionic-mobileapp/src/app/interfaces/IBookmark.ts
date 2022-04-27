import { IIngredientOut } from "./IIngredient"
import { IRecipeOut } from "./IRecipe"

export interface IIngredientBookmarkIn
{
    ingredientId:number
    saved:number
}

export interface IIngredientBookmarkOut
{
    ingredient:IIngredientOut
    ingredientId:number
    saved:number
}

export interface IRecipeBookmarkIn
{
    recipeId:number
    saved:number
}

export interface IRecipeBookmarkOut
{
    recipe:IRecipeOut
    recipeId:number
    saved:number
}