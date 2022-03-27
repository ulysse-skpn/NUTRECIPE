
import { AllowNull, Column, Table , IsFloat , IsDate , IsInt , PrimaryKey , DataType } from "sequelize-typescript";
// import { DataTypes } from "sequelize/types";
import { BaseModel } from "../model/baseModel";

@Table
export class Ingredient extends BaseModel<Ingredient>
{
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    // @Column(DataType.TEXT)
    @Column
    product_name!: string;
    
    // @Column(DataType.TEXT)
    @Column
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

    @IsInt
    @Column(DataType.SMALLINT)
    quantity!: number;

    @Column
    status!: boolean;

    @Column(DataType.TEXT)
    image!: string;

    @IsDate
    @Column
    readonly created_at!: Date;

    @IsDate
    @Column
    readonly updated_at!: Date;

}

export enum NOVA_GROUP
{
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4
}

export const isIngredient = (obj:any) => {
    if( obj.hasOwnProperty("product_name")
    &&
    obj.hasOwnProperty("ingredient_text")
    &&
    obj.hasOwnProperty("carbohydrates")
    &&
    obj.hasOwnProperty("proteins") 
    &&
    obj.hasOwnProperty("fats")
    &&
    obj.hasOwnProperty("salt") 
    &&
    obj.hasOwnProperty("calories")
    &&
    obj.hasOwnProperty("nova_group") 
    &&
    obj.hasOwnProperty("categories")
    &&
    obj.hasOwnProperty("serving_size")
    && 
    obj.hasOwnProperty("quantity") 
    &&
    obj.hasOwnProperty("status") 
    &&
    obj.hasOwnProperty("image") )    return true
    else return false
}