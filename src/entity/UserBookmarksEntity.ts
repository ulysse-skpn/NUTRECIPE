import { Column, Table , ForeignKey } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { BookmarkIngredient } from "./BookmarkIngredientEntity";
import { BookmarkRecipe } from "./BookmarkRecipeEntity";
import { User } from "./UserEntity";

@Table
export class UserBookmarks extends BaseModel<any>
{

}