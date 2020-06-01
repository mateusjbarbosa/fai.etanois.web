export interface Post {
    id?: number,
    name: string,
    address: string,
    cnpj: string,
    email: string,
    phone_number: string,
    payment_card: number,
    password: string,
    cep: string,
    flag_of_fuel_station: string,
    openning_hours: string,
    restaurant: boolean,
    car_wash: boolean,
    mechanical: boolean
}