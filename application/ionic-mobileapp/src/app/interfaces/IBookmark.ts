import { IIngredientOut } from "./IIngredient"
import { IRecipeOut } from "./IRecipe"

export interface IBookmarkIn
{
    type:string
    itemId:number
    saved:number
}

export interface IBookmarkOut
{
    item:IIngredientOut|IRecipeOut
    type:string
    itemId:number
    saved:number
}