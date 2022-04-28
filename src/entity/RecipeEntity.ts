import { AllowNull, Column, Table , DataType, PrimaryKey, AutoIncrement, Model, HasMany, HasOne } from "sequelize-typescript";
import { BookmarkRecipe } from "./BookmarkRecipeEntity";

@Table
export class Recipe extends Model
{
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column(DataType.INTEGER)
    recipeId!: number
    
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

    // @HasMany( () => BookmarkRecipe )
    // bookmarkRecipe!:BookmarkRecipe

    @HasOne( () => BookmarkRecipe )
    bookmarkRecipe!:BookmarkRecipe
}