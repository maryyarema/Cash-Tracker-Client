import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";
export default class AuthService{

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/login', {email, password})
            // .then(response => response.data.)
    }

    static async signup(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/signup', {email, password, name})
            // .then(response => response.data.)
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
}
