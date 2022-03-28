import { ILoginService, userRole } from "../ILoginService";

export class LoginServiceImpl implements ILoginService
{
    userExist(login: string, password: string): Promise<boolean> 
    {
        throw new Error("Method not implemented.");
    }

    getUserRole(login: string, password: string): Promise<userRole> 
    {
        throw new Error("Method not implemented.");
    }
}