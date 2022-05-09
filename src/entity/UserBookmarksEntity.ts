import { Column, Table , ForeignKey, AllowNull } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { BookmarkIngredient } from "./BookmarkIngredientEntity";
import { BookmarkRecipe } from "./BookmarkRecipeEntity";
import { User } from "./UserEntity";

@Table
export class UserBookmarks extends BaseModel<any>
{
    @AllowNull(false)
    @ForeignKey( () => User )
    @Column
    userId!:number

    @AllowNull(false)
    @ForeignKey( () => BookmarkIngredient )
    @Column
    ingredientBookmarkId!:number

    @AllowNull(false)
    @ForeignKey( () => BookmarkRecipe )
    @Column
    recipeBookmarkId!:number
}