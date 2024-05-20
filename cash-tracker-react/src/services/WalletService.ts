import $api from "../http";
import { AxiosResponse } from "axios";

import { WalletData } from "../models/WalletData";

export default class WalletServise{
 // Wallet

static async getWalletData(): Promise<WalletData> {
    const response: AxiosResponse<WalletData> = await $api.get<WalletData>('/wallet');
    return response.data;
}
}
