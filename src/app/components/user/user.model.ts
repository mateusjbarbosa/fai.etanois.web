export interface User {
    id?: number,
    username: string,
    email: string,
    password: string,
    name: string,
    cep?: string,
    search_distance_with_route?: number,
    search_distance_without_route?: number,
    payment_mode?: string,
    phone_number?: string,
    role?: string,
    etacoins?: number,
}