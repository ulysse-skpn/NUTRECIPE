import { Column, Table , ForeignKey, AllowNull } from "sequelize-typescript";
import { BaseModel } from "../model/baseModel";
import { Bookmark } from "./BookmarkEntity";
import { User } from "./UserEntity";

@Table
export class UserBookmarks extends BaseModel<any>
{
    @AllowNull(false)
    @ForeignKey( () => User )
    @Column
    userId!:number

    @AllowNull(false)
    @ForeignKey( () => Bookmark )
    @Column
    bookmarkId!:number
}