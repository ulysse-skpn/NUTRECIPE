import { AllowNull, Column, Table , DataType, Unique, IsEmail, Length, Model, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table
export class User extends Model
{
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column(DataType.INTEGER)
    userId!: number

    @AllowNull(false)
    @Column
    last_name!: string;

    @AllowNull(false)
    @Column
    first_name!: string;

    // @Unique
    @Column(DataType.STRING(20))
    phone_number!: string;

    // @Unique
    @IsEmail
    @AllowNull(false)
    @Column
    email!: string;

    @Length({min:6})
    @AllowNull(false)
    @Column
    password!: string;

    @AllowNull(false)
    @Column
    role!: string;

    @Column
    receiveEmail!: boolean

    @Column
    receiveNotification!: boolean
}