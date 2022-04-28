import { AllowNull, Column, Table , Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Recipe } from "./RecipeEntity";
import { User } from "./UserEntity";

@Table
export class BookmarkRecipe extends Model
{
    @ForeignKey( () => Recipe )
    @AllowNull(false)
    @Column
    recipeId!:number

    @BelongsTo( () => Recipe )
    recipe!:Recipe

    @ForeignKey( () => User )
    @AllowNull(false)
    @Column
    userId!:number

    @BelongsTo( () => User )
    user!:User

    @AllowNull(false)
    @Column
    saved!:boolean
}