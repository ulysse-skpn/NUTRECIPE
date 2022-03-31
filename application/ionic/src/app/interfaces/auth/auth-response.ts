export interface AuthResponse {
    user: {
        name: string,
        email: string
    }
    access_token: string,
    expires_in: number
}
