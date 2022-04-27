import { Column, Table , AllowNull, ForeignKey, Model, BelongsTo } from "sequelize-typescript";
import { Ingredient } from "./IngredientEntity";

@Table
export class BookmarkIngredient extends Model
{
    @AllowNull(false)
    @ForeignKey( () => Ingredient )
    @Column 
    ingredientId!:number

    @BelongsTo( () => Ingredient )
    ingredient!: Ingredient

    @Column
    saved!:boolean
}