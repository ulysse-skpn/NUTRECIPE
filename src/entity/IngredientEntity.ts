
import { AllowNull, Column, Table , IsFloat , IsDate , IsInt , PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";

@Table
export class Ingredient extends BaseModel<Ingredient>
{
    @PrimaryKey
    @AllowNull(false)
    id!: number;

    @AllowNull(false)
    @Column
    product_name!: string;
    
    @Column
    ingredient_text!: string;

    @IsFloat
    @Column
    carbohydrates!: number;

    @IsFloat
    @Column
    proteins!: number;

    @IsFloat
    @Column
    fats!: number;

    @IsFloat
    @Column
    salt!: number;

    @IsFloat
    @Column
    calories!: number;

    @Column 
    // (DataType.ENUM( NOVA_GROUP.ONE , NOVA_GROUP.TWO , NOVA_GROUP.THREE , NOVA_GROUP.FOUR )
    nova_group!: NOVA_GROUP;

    @Column
    categories!: string;

    @Column
    serving_size!: string;

    @IsInt
    @Column
    quantity!: number;

    @Column
    status!: boolean;

    @Column
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