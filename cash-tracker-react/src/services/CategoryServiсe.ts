import $api from "../http";
import { AxiosResponse } from "axios";
import { CategoryResponse } from "../models/CategoryResponse"; 

export default class CategoryService{
 // Income Categories
 static async addIncomeCategory(name: string): Promise<AxiosResponse<CategoryResponse>> {
    return $api.post<CategoryResponse>('/income-categories', { name });
}

static async getIncomeCategories(): Promise<AxiosResponse<CategoryResponse[]>> {
    return $api.get<CategoryResponse[]>('/income-categories');
}

// Expense Categories
static async addExpenseCategory(name: string): Promise<AxiosResponse<CategoryResponse>> {
    return $api.post<CategoryResponse>('/expense-categories', { name });
}

static async getExpenseCategories(): Promise<AxiosResponse<CategoryResponse[]>> {
    return $api.get<CategoryResponse[]>('/expense-categories');
}

}