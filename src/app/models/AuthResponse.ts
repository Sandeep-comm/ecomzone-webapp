import { Users } from "./Users"

export interface AuthResponse{
    valid: boolean
    message : string
    user: Users

}