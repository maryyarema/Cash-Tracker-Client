import $api from "../http";
import { AxiosResponse } from "axios";
import { Expense } from "../models/Expense"; 
import { WalletData } from "../models/WalletData";




export default class ExpenseServise{
 // Expense 
 static async addExpenses(expenses: Expense): Promise<AxiosResponse<Expense>> {
    console.log(expenses)
    console.log(new Date().toISOString())
    return $api.post<Expense>('/expenses', expenses);
}

static async getExpenses(): Promise<AxiosResponse<Expense[]>> {
    return $api.get<Expense[]>('/expenses');
}
static async getWalletData(): Promise<AxiosResponse<WalletData>> {
    return $api.get<WalletData>('/wallet');
}


}