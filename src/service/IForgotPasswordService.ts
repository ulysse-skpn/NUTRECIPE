export interface IForgotPasswordService
{
    userExists(login:string): Promise<boolean>
    saveNewPassword(password:string): Promise<any>
}