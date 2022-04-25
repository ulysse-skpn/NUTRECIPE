import { Request, Response} from "express";
import { logger } from "../lib/config/winston";
import { ApiError } from "../handlers/ApiError";
import { BookmarkServiceImpl } from "../service/Impl/BookmarkServiceImpl";
import { Bookmark } from "../entity/BookmarkEntity";


export class BookmarksCtrl
{   
    async getAll(req:Request , res:Response)
    {
        const bookmarkServiceImpl:BookmarkServiceImpl = new BookmarkServiceImpl()

        try 
        {
            const bookmarksList:Bookmark[] = await bookmarkServiceImpl.getAllBookmarks()
            res.status(200).send(bookmarksList)
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET ALL Bookmarks : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    async getById(req:Request , res:Response)
    {
        let id:number
        const bookmarkServiceImpl:BookmarkServiceImpl = new BookmarkServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Bookmark Id is not a number")

            const bookmark:Bookmark = await bookmarkServiceImpl.getBookmarkById(id)

            if( bookmark ) res.status(200).send(bookmark)
            else res.status(404).send( ApiError.not_found("There is no bookmark with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => GET Bookmark BY ID : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    async create(req:Request , res:Response)
    {
        const bookmarkServiceImpl:BookmarkServiceImpl = new BookmarkServiceImpl()

        try 
        {
            if( !isBookmark(req.body) ) throw Error("Bookmark object is malformed")
            const bookmark: Bookmark = req.body

            const result:Bookmark = await bookmarkServiceImpl.addBookmark(bookmark)
            res.status(201).send(result)
        } 
        catch (err:any) 
        {
            logger.error( `Method => POST Bookmark : ${err.message}` )
            res.status(400).send( ApiError.badRequest(err.message) )
        }
    }


    async update(req:Request , res:Response)
    {
        let id:number
        const bookmarkServiceImpl:BookmarkServiceImpl = new BookmarkServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Bookmark Id is not a number")
            if( !isBookmark(req.body) ) throw Error("Bookmark object is malformed")
            const bookmark: Bookmark = req.body
            
            const result = await bookmarkServiceImpl.updateOrCreateBookmark(id,bookmark)

            if( result ) res.status(202).send(result)
            else res.status(404).send( ApiError.not_found("There is no bookmark with this id") )
        } 
        catch (err:any) 
        {
            logger.error( `Method => PUT Bookmark : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }


    async delete(req:Request , res:Response)
    {
        let id:number
        const bookmarkServiceImpl:BookmarkServiceImpl = new BookmarkServiceImpl()

        try 
        {
            id = parseInt(req.params.id)
            if( isNaN(id) ) throw Error("Bookmark Id is not a number")

            await bookmarkServiceImpl.deleteBookmark(id)
            res.status(204).send(true)
        } 
        catch (err:any) 
        {
            logger.error( `Method => DELETE Bookmark : ${err.message}` )
            res.status(400).send( ApiError.not_found(err.message) )
        }
    }

}

const isBookmark = (obj:any) => {
    if( obj.hasOwnProperty("type")
    && obj.hasOwnProperty("itemId")
    && obj.hasOwnProperty("saved")
    ) return true
    else return false
}
