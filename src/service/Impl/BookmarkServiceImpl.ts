import { BookmarkRepository } from "../../DAO/BookmarkRepository"
import { Bookmark } from "../../entity/BookmarkEntity"
import { IBookmarkService } from "../IBookmarkService"


export class BookmarkServiceImpl implements IBookmarkService
{
    bookmarkRepository : BookmarkRepository = new BookmarkRepository()

    constructor(){}

    async bookmarkExist(id: number): Promise<boolean>
    {
        return this.bookmarkRepository.exists(id)
    }

    async getAllBookmarks(): Promise<Bookmark[]>
    {
        return this.bookmarkRepository.findAll()
    }

    async getBookmarkById(id: number): Promise<Bookmark>
    {
        return this.bookmarkRepository.findById(id)
    }

    async addBookmark(item: Bookmark): Promise<Bookmark>
    {
        return this.bookmarkRepository.create(item)
    }

    async updateBookmark(id: number, item: Bookmark): Promise<[affectedcount:number]>
    {
        return this.bookmarkRepository.put(id,item)
    }

    async deleteBookmark(id: number): Promise<number>
    {
        return this.bookmarkRepository.delete(id)
    }
    
}