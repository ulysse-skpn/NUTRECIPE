import { AllowNull, Column, Table , DataType, Unique } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";

@Table
export class Recipe extends BaseModel<Recipe>
{
    @Unique
    @AllowNull(false)
    @Column
    title!: string;

    @Column
    prep_time!: string;

    @Column
    cooking_time!: string;

    @Column
    rest_time!: string;

    @Column(DataType.TEXT)
    categories!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    ingredients_list!: string;

    @Column
    serving_size!: string;

    @Column(DataType.TEXT)
    instructions!: string;

    @Column(DataType.TEXT)
    image!: string;

}