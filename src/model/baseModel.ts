import { Table , Model, PrimaryKey, DataType, Column, AutoIncrement, AllowNull, IsDate } from "sequelize-typescript"

@Table
export class BaseModel<T> extends Model<T>
{
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @IsDate
    @Column
    readonly created_at!: Date;

    @IsDate
    @Column
    readonly updated_at!: Date;
}