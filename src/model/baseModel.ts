import { Table , Model, PrimaryKey, Default, DataType, Column, IsUUID } from "sequelize-typescript"

@Table
export class BaseModel<T> extends Model<T>
{
    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!:number;

    // @CreatedAt
    // creationDate!: Date;

    // @UpdatedAt
    // updatedOn!: Date;

    // @DeletedAt
    // deletionDate!: Date;
}