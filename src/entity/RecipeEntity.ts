import { AllowNull, Column, Table , DataType,  BelongsTo, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { Bookmark } from "./BookmarkEntity";
import { Ingredient } from "./IngredientEntity";
import { RecipeIngredients } from "./RecipeIngredientsEntity";

@Table
export class Recipe extends BaseModel<Recipe>
{
    @AllowNull(false)
    @Column
    title!: string;

    @Column
    prep_time!: string;

    @Column
    cooking_time!: string;

    @Column
    rest_time!: string;

    @Column(DataType.TEXT)
    categories!: string;

    @Column(DataType.TEXT)
    ingredients_list!: string;

    @Column
    serving_size!: string;

    @Column(DataType.TEXT)
    instructions!: string;

    @Column(DataType.TEXT)
    image!: string;

    @ForeignKey( () => Bookmark )
    @Column
    recipeId!:number

    @BelongsTo( () => Bookmark )
    bookmark!: Bookmark

    @BelongsToMany( () => Ingredient , { as: 'recipe_ingredients' , through: () => RecipeIngredients}  )
    recipe_ingredients!: Ingredient[]
}