import React, { useState, useEffect, createContext } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress, WALLET_STATUS } from '../utils/constants';

export const TransactionContext = createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({ provider, signer, transactionContract });
};

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask.");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                setConnectedAccount(accounts[0]);
                // getAllTransactions();
            } else {
                console.log('No accounts found');
            }
        } catch(err) {
            const { code } = err;
            if (code === WALLET_STATUS.USER_REJECTED_THE_REQUEST) {
                alert("Please, connect your wallet to proceed");
            }
            console.error(err);
            throw new Error("No ethereum object.")
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask.");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts);
            setConnectedAccount(accounts[0]);
        } catch(err) {
            const { code } = err;
            if (code === WALLET_STATUS.USER_REJECTED_THE_REQUEST) {
                alert("Please, connect your wallet to proceed");
            }
            console.error(err);
            throw new Error("No ethereum object.")
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet }}>
            {children}
        </TransactionContext.Provider>
    );
};