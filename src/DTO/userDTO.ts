import { Model } from "sequelize/types";
import { User } from "../entity/UserEntity";

export class UserDTO extends Model
{
    public last_name!: string;
    public first_name!: string;
    public phone_number!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    
    constructor(user: User)
    {
        super()
        this.last_name = user.last_name
        this.first_name = user.first_name
        this.phone_number = user.phone_number
        this.email = user.email
        this.password = user.password
        this.role = user.role
    }
}