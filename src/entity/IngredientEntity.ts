
import { AllowNull, Column, Table , IsFloat , IsInt , DataType } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";

@Table
export class Ingredient extends BaseModel<Ingredient>
{
    @AllowNull(false)
    @Column
    product_name!: string;
    
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
    @Column(DataType.TINYINT)
    quantity!: number;

    @Column
    status!: boolean;

    @Column(DataType.TEXT)
    image!: string;

}

export enum NOVA_GROUP
{
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4
}