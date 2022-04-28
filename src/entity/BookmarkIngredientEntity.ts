import { AllowNull, Column, Table , Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Ingredient } from "./IngredientEntity";
import { User } from "./UserEntity";

@Table
export class BookmarkIngredient extends Model
{
    @ForeignKey( () => Ingredient )
    @AllowNull(false)
    @Column
    ingredientId!:number

    @BelongsTo( () => Ingredient )
    ingredient!:Ingredient

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