import { NextFunction, Request, Response } from "express"
import { ApiError } from "./ApiError"

export const apiErrorHandler = ( err:Error , req:Request , res:Response , newt:NextFunction ) => 
{
    console.error(err)

    if( err instanceof ApiError ) 
    {
        res.status(err.code).json(err.message) 
        return
    }

    res.status(500).json("Internal Server Error")
}