export class ApiError
{
    public readonly code:number
    public readonly message:string

    constructor( code:number , message:string )
    {
        this.code = code
        this.message = message
    }

    static badRequest(msg:string)
    {
        return new ApiError(400,msg)
    }

    static unauthorized(msg:string)
    {
        return new ApiError(401,msg)
    }

    static forbidden(msg:string)
    {
        return new ApiError(403,msg)
    }

    static not_found(msg:string)
    {
        return new ApiError(404,msg)
    }

    static internal_server_error(msg:string)
    {
        return new ApiError(500,msg)
    }

    static unknown_error(msg:string)
    {
        return new ApiError(520,msg)
    }
}