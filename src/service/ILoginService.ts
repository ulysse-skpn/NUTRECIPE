export interface ILoginService
{
    userExist(login:string,password:string): Promise<boolean>
    getUserRole(login:string,password:string): Promise<IUserRole>
}

export interface IUserRole
{
    email:string
    role:string
}