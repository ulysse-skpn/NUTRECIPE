import { AllowNull, Column, Table , DataType, Unique, BelongsToMany } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { Bookmark } from "./BookmarkEntity";
import { Ingredient } from "./IngredientEntity";
import { RecipeBookmarks } from "./RecipeBookmarksEntity";
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

    @BelongsToMany( () => Ingredient , { as: 'recipe_has_ingredients' , through: () => RecipeIngredients}  )
    recipe_has_ingredients!: Recipe

    @BelongsToMany( () => Bookmark , { as: 'recipe_has_bookmarks' , through: () => RecipeBookmarks}  )
    recipe_has_bookmarks!: Recipe
}