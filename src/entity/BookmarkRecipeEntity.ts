import { Column, Table , AllowNull , ForeignKey, Model, BelongsTo } from "sequelize-typescript";
import { Recipe } from "./RecipeEntity";

@Table
export class BookmarkRecipe extends Model
{
    @AllowNull(false)
    @ForeignKey( () => Recipe )
    @Column 
    recipeId!:number

    @BelongsTo( () => Recipe )
    ingredient!: Recipe

    @Column
    saved!:boolean
}