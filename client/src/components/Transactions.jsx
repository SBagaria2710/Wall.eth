import React, { useContext } from 'react';

import { TransactionContext } from '../context/TransactionContext';
import dummyData from '../utils/dummyData';

const Transactions = () => {

    const { connectedAccount } = useContext(TransactionContext);

    return (
        <div className="flex items-center justify-center w-full 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col px-4 py-12 md:p-12">
                <h3 className="my-2 text-3xl text-center text-white">
                    {connectedAccount ? "Latest Tranactions" : "Connect your account to see the changes"}
                </h3>
            </div>
        </div>
    );
};

export default Transactions;
