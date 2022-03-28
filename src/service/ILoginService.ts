export interface ILoginService
{
    userExist(login:string,password:string): Promise<boolean>
    getUserRole(login:string,password:string): Promise<userRole>
}

export interface userRole
{
    email:string
    role:string
}