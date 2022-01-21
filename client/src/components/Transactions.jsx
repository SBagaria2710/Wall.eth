import React, { useContext } from 'react';

import { shortenAddress } from '../utils/shortenAddress';
import { TransactionContext } from '../context/TransactionContext';
import useFetch from '../hooks/useFetch';

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
    const gifUrl = useFetch({ keyword });
    return (
        <div className="bg-[#181918] m-4 flex flex-1
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[300px]
        flex-col p-3 rounded-md hover:shadow-2xl"
        >
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full p-2 mb-6">
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferral">
                        <p className="text-base text-white">From: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferral">
                        <p className="text-base text-white">From: {shortenAddress(addressTo)}</p>
                    </a>
                    <p className="text-base text-white">Amount: {amount} ETH</p>
                    {message && (
                        <React.Fragment>
                            <br />
                            <p className="text-base text-white">Message: {message}</p>
                        </React.Fragment>
                    )}
                </div>
                <img 
                    src={gifUrl || url}
                    alt="gif"
                    className="object-cover w-full h-64 rounded-md shadow-lg 2x:h-96"
                />
                <div className="p-3 px-5 -mt-5 bg-black shadow-2xl w-max rounded-3xl">
                    <p className="text-[#37c7da]">{timestamp}</p>
                </div>
            </div>
        </div>
    );
};

const Transactions = () => {
    const { connectedAccount, transactions, transactionCount } = useContext(TransactionContext) || {};

    return (
        <div className="flex items-center justify-center w-full 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col px-4 py-12 md:p-12">
                <h3 className="my-2 text-3xl text-center text-white">
                    {connectedAccount ? `Latest Tranactions (${transactionCount})` : "Connect your account to see the changes"}
                </h3>
                <div className="flex flex-wrap items-center justify-center mt-10">
                    {transactions.reverse().map((transaction, index) => (
                        <TransactionCard key={index} {...transaction}  />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
