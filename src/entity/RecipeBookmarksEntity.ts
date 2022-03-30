import { Column, Table , ForeignKey } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { Bookmark } from "./BookmarkEntity";
import { Recipe } from "./RecipeEntity";

@Table
export class RecipeBookmarks extends BaseModel<any>
{
    @ForeignKey( () => Recipe )
    @Column
    recipeId!: number

    @ForeignKey( () => Bookmark )
    @Column
    bookmarkId!: number
}