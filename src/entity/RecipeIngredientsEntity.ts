import { Column, Table , ForeignKey } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { Ingredient } from "./IngredientEntity";
import { Recipe } from "./RecipeEntity";

@Table
export class RecipeIngredients extends BaseModel<any>
{
    @ForeignKey( () => Recipe )
    @Column
    recipeId!: number

    @ForeignKey( () => Ingredient )
    @Column
    ingredientId!: number
}