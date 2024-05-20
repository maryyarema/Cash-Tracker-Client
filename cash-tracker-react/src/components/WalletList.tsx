import React, { useEffect, useState } from 'react';
import WalletService from '../services/WalletService';
import { WalletData } from '../models/WalletData';

const WalletList: React.FC = () => {
    const [walletData, setWalletData] = useState<WalletData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                const data = await WalletService.getWalletData();
                setWalletData(data);
            } catch (error) {
                setError('Failed to fetch wallet data.');
            } finally {
                setLoading(false);
            }
        };

        fetchWalletData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="wallet-list">
            <h1>Wallet Summary</h1>
            {walletData && (
                <ul>
                    <li>Total: ${walletData.total}</li>
                    <li>Cash: ${walletData.cash}</li>
                    <li>Card: ${walletData.card}</li>
                </ul>
            )}
        </div>
    );
};

export default WalletList;
