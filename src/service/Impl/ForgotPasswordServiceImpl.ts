import { IForgotPasswordService } from "../IForgotPasswordService";

export class ForgotPasswordServiceImpl implements IForgotPasswordService
{
    saveNewPassword(password: string): Promise<any> 
    {
        throw new Error("Method not implemented.");
    }

    userExists(login: string): Promise<boolean> 
    {
        throw new Error("Method not implemented.");
    }
}