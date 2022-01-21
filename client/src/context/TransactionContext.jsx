import React, { useState, useEffect, createContext } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress, WALLET_STATUS } from '../utils/constants';

export const TransactionContext = createContext();
const { ethereum } = window;

const handleCatch = (err) => {
    const { code } = err || {};
    if (code === WALLET_STATUS.USER_REJECTED_THE_REQUEST) {
        alert("Oops, Something went wrong.");
    }
    throw new Error("No ethereum object.")
}

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install metamask.");

            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
              }));
            
            setTransactions(structuredTransactions);
        } catch(err) {
            handleCatch(err);
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask.");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                setConnectedAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log('No accounts found');
            }
        } catch(err) {
            handleCatch(err);
        }
    };

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionsCount();

            window.localStorage.setItem("transactionCount", transactionCount);
        } catch(err) {
            handleCatch(err);
        };
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask.");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts);
            setConnectedAccount(accounts[0]);
        } catch(err) {
            handleCatch(err);
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask.");
            setIsLoading(true);
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 gwei
                    value: parsedAmount._hex
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount);
            window.location.reload();
        } catch(error) {
            handleCatch(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            setFormData,
            handleChange,
            sendTransaction,
            isLoading,
            transactions,
            transactionCount,
            connectedAccount,
            formData,
        }}>
            {children}
        </TransactionContext.Provider>
    );
};
