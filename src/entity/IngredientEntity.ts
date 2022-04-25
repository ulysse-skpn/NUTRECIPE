
import { AllowNull, Column, Table , IsFloat , DataType, BelongsTo, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { Bookmark } from "./BookmarkEntity";
import { Recipe } from "./RecipeEntity";
import { RecipeIngredients } from "./RecipeIngredientsEntity";

@Table
export class Ingredient extends BaseModel<Ingredient>
{
    @AllowNull(false)
    @Column
    product_name!: string;
    
    @Column(DataType.TEXT)
    ingredient_text!: string;

    @IsFloat
    @Column(DataType.FLOAT)
    carbohydrates!: number;

    @IsFloat
    @Column(DataType.FLOAT)
    proteins!: number;

    @IsFloat
    @Column(DataType.FLOAT)
    fats!: number;

    @IsFloat
    @Column(DataType.FLOAT)
    salt!: number;

    @IsFloat
    @Column(DataType.FLOAT)
    calories!: number;

    // (DataType.ENUM( NOVA_GROUP.ONE , NOVA_GROUP.TWO , NOVA_GROUP.THREE , NOVA_GROUP.FOUR )
    @Column(DataType.CHAR(1))
    nova_group!: NOVA_GROUP;

    @Column(DataType.TEXT)
    categories!: string;

    @Column
    serving_size!: string;

    @Column(DataType.TEXT)
    image!: string;

    @ForeignKey( () => Bookmark )
    @Column
    ingredientId!:number

    @BelongsTo( () => Bookmark )
    bookmark!: Bookmark

    @BelongsToMany( () => Recipe , { as: 'recipe_ingredients' , through: () => RecipeIngredients}  )
    recipe_ingredients!: Recipe[]
}

export enum NOVA_GROUP
{
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4
}