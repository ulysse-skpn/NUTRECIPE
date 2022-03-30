import { Column, Table , DataType, AllowNull, Unique, BelongsToMany } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { RecipeBookmarks } from "./RecipeBookmarksEntity";
import { Recipe } from "./RecipeEntity";
import { UserBookmarks } from "./UserBookmarksEntity";
import { User } from "./UserEntity";

@Table
export class Bookmark extends BaseModel<Bookmark>
{
    @Unique
    @AllowNull(false)
    @Column
    label!: string;

    //? 1 : categorie bookmark 1 
    //? 2 : categorie bookmark 2
    //? 3 : categorie bookmark 3
    //? 4 : categorie bookmark 4    
    @AllowNull(false)
    @Column(DataType.CHAR(1))
    category!: number;

    @AllowNull(false)
    @Column
    saved!: boolean;

    @BelongsToMany( () => User , { as: 'bookmark_has_users' , through: () => UserBookmarks}  )
    bookmark_has_users!: Bookmark

    @BelongsToMany( () => Recipe , { as: 'bookmark_has_recipes' , through: () => RecipeBookmarks}  )
    bookmark_has_recipes!: Bookmark
}