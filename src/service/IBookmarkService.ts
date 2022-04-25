import { Bookmark } from "../entity/BookmarkEntity"

export interface IBookmarkService
{
    bookmarkExist(id:number): Promise<boolean>
    getAllBookmarks(): Promise<Bookmark[]>
    getBookmarkById(id:number): Promise<Bookmark>
    addBookmark(item:Bookmark): Promise<Bookmark>
    updateBookmark(id:number,item:Bookmark): Promise<[affectedCount:number]> // number => Affected row
    updateOrCreateBookmark(id:number,item:Bookmark): Promise<Bookmark | [affectedCount:number]>
    deleteBookmark(id:number): Promise<number>
}