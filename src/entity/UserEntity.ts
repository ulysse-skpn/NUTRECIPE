import { AllowNull, Column, Table , DataType } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";

@Table
export class User extends BaseModel<User>
{
    @AllowNull(false)
    @Column
    last_name!: string;

    @AllowNull(false)
    @Column
    first_name!: string;

    @Column(DataType.STRING(20))
    phone_number!: string;

    @AllowNull(false)
    @Column
    email!: string;

    @AllowNull(false)
    @Column
    password!: string;

    @AllowNull(false)
    @Column
    role!: string;
}