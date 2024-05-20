import $api from "../http";
import { AxiosResponse } from "axios";
import { Income } from "../models/Income"; 
import { WalletData } from "../models/WalletData";




export default class IncomeServise{
 // Income 
 static async addIncome(income: Income): Promise<AxiosResponse<Income>> {
    console.log(income)
    console.log(new Date().toISOString())
    return $api.post<Income>('/incomes', income);
}

static async getIncomes(): Promise<AxiosResponse<Income[]>> {
    return $api.get<Income[]>('/incomes');
}
static async getWalletData(): Promise<AxiosResponse<WalletData>> {
    return $api.get<WalletData>('/wallet');
}


}