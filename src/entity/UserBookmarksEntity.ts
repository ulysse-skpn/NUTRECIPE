import { Column, Table , ForeignKey } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { Bookmark } from "./BookmarkEntity";
import { User } from "./UserEntity";

@Table
export class UserBookmarks extends BaseModel<any>
{
    @ForeignKey( () => User )
    @Column
    userId!: number

    @ForeignKey( () => Bookmark )
    @Column
    bookmarkId!: number
}