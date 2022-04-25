import { AllowNull, Column, Table , DataType, Unique, IsEmail, BelongsToMany, Length } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { Bookmark } from "./BookmarkEntity";
import { UserBookmarks } from "./UserBookmarksEntity";

@Table
export class User extends BaseModel<User>
{
    @AllowNull(false)
    @Column
    last_name!: string;

    @AllowNull(false)
    @Column
    first_name!: string;

    @Unique
    @Column(DataType.STRING(20))
    phone_number!: string;

    @Unique
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

    @BelongsToMany( () => Bookmark , { as: 'user_has_bookmarks' , through: () => UserBookmarks}  )
    user_has_bookmarks!: Bookmark[]
}