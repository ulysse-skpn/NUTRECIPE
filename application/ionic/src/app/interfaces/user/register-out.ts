export interface RegisterOut {
    user:{
        last_name: string;
        first_name: string;
        phone_number:string;
        email: string;
        password: string;
        status:number
    },
    access_token:string,
    expires_in:number
}
