import React, { useContext } from 'react';
import { useState } from "react";
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { TransactionContext } from "../context/TransactionContext";

const commonStyles="min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        name={name}
        type={type}
        placeholder={placeholder}
        step="0.0001"
        value={value}
        onChange={handleChange}
        className="w-full p-2 my-2 text-white bg-transparent border-none rounded-sm outline-none white-glassmorphism"
    />
);

const Welcome = () => {
    const {
        connectWallet,
        connectedAccount,
        formData,
        handleChange,
        sendTransaction,
        isLoading
    } = useContext(TransactionContext) || {};
    
    const handleSubmit = (e) => {
        e.preventDefault;

        const { addressTo, amount, keyword, message } = formData;
        if (!addressTo || !amount || !keyword || !message) {
            alert("Cannot process transaction with empty field(s)");
            return;
        } else {
            sendTransaction();
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-start justify-between gap-10 px-4 py-12 mf:flex-row md:p-20">
                <div className="flex-col flex-1 justfy-start fle-col mf:mr-10">
                    <h1 className="py-1 text-3xl text-white sm:text-5xl text-gradient">Send Crypto <br /> around the world!</h1>
                    <p className="w-11/12 mt-5 font-light text-left text-white md:w-9/12">
                        Explore the crypto world. Buy and sell cryptocurrencies easily on Wall.eth
                    </p>
                    {!connectedAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row w-full justify-center items-center my-5
                            bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <p className="text-base font-semibold text-white">Connect Wallet</p>
                        </button>
                    )}
                    <div className="grid w-full grid-cols-2 mt-10 sm:grid-cols-3">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
                        <div className={commonStyles}>Security</div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
                        <div className={commonStyles}>Low fees</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
                    </div> 
                </div>
                <div className="flex flex-col items-center justify-start flex-1 w-full mt-10 mf:mt-0">
                    <div className="flex-col items-start justify-end w-full h-40 p-2 my-5 rounded-xl sm:w-72 eth-card white-glassmorphism">
                        <div className="flex flex-col justify-between w-full h-full">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center justify-center w-10 h-10 border-2 border-white rounded-full">
                                    <SiEthereum fontSize={20} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={18} color="#fff" />
                            </div>
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-light text-white">
                                        Address
                                    </p>
                                    <p className="mt-1 text-lg font-semibold text-white">
                                        Ethereum
                                    </p>
                                </div>
                                {connectedAccount && <p className="overflow-hidden text-sm text-white text-ellipsis">{connectedAccount}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-start w-full p-5 sm:w-96 blue-glassmorphism">
                        <Input type="text" placeholder="Address to" name="addressTo" handleChange={handleChange} />
                        <Input type="number" placeholder="Amount (ETH)" name="amount" handleChange={handleChange} />
                        <Input type="text" placeholder="Keyword (Gif)" name="keyword" handleChange={handleChange} />
                        <Input type="text" placeholder="Enter Message" name="message" handleChange={handleChange} />

                        <div className="h-[2px] w-full bg-gray-400 my-2"></div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="text-white w-full mt-2 border-[2px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                        >
                            {isLoading ? "Loading..." : "Send Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
