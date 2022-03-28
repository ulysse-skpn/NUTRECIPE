import { User } from "../../entity/UserEntity";
import { IRegisterService } from "../IRegisterService";

export class RegisterServiceImpl implements IRegisterService
{
    createUser(user:User): Promise<User> 
    {
        throw new Error("Method not implemented.");
    }
}