import { Column, Table , DataType, AllowNull, Unique, BelongsToMany, HasMany } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { Ingredient } from "./IngredientEntity";
import { Recipe } from "./RecipeEntity";
import { UserBookmarks } from "./UserBookmarksEntity";
import { User } from "./UserEntity";

@Table
export class Bookmark extends BaseModel<Bookmark>
{
    @AllowNull(false)
    @Column
    type!:string

    @AllowNull(false)
    @Column
    itemId!:number

    @AllowNull(false)
    @Column
    saved!: boolean;

    @HasMany( () => Ingredient )
    ingredients!: Ingredient[]
    
    @HasMany( () => Recipe )
    recipes!: Recipe[]

    @BelongsToMany( () => User , { as: 'bookmark_has_users' , through: () => UserBookmarks}  )
    bookmark_has_users!: User[]
}