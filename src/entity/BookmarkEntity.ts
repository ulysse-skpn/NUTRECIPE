import { Column, Table , DataType, AllowNull } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";

@Table
export class Bookmark extends BaseModel<Bookmark>
{
    @AllowNull(false)
    @Column
    label!: string;

    //* 1 ://TODO categorie bookmark 1 
    //* 2 ://TODO categorie bookmark 2
    //* 3 ://TODO categorie bookmark 3
    //* 4 ://TODO categorie bookmark 4    
    @AllowNull(false)
    @Column(DataType.CHAR(1))
    category!: number;

    @AllowNull(false)
    @Column
    saved!: boolean;
}