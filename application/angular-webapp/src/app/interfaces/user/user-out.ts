import { User } from "./user"

export interface UserOut 
{
    user:User
    access_token:string
    expires_in:number
}
