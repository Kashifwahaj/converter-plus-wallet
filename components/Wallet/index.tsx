import React, { FC, useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3'
import { injected } from '../../utils/connecter';
import Modal from '../Modal';
import { n_format } from '../../utils/common';

interface props {
}

const Wallet: FC<props> = () => {

    // Props
    const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React();
    const [balance, setBalance] = useState(0)
    // States

    const [open, setOpen] = useState(false)

    // Redux

    // Functions

    const connect = async () => {

        try {
           await activate(injected);
            await getBalance();


        } catch (error) {
            console.log(error);

        }
    }

    const getBalance = async () => {
        const testnet = 'https://mainnet.infura.io/v3/d4d390eb04ac48918dfd980fa3ef7dd6';
        // const walletAddress = '0x8690F1feff62008A396B31c2C3f380bD0Ca6d8b8';
        const walletAddress = '0xF318909d404cd582771e0E47A2135c65B60d2b50';

        const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
        var balance = await web3.eth.getBalance(walletAddress); //Will give value in.
        setBalance(n_format(parseFloat(balance)))

        // balance = web3.toDecimal(balance);
    }

    const disconnect = () => {
        try {
            deactivate()
        } catch (error) {
            console.log(error);

        }
    }




    // Side Effects

    // JSX
    return (
        <div>
            <div onClick={() => setOpen(!open)} className="text-md text-blue-200 text-center cursor-pointer hover:opacity-30 mt-5">
                Check Wallet Details
        </div>
            <Modal open={open} setOpen={setOpen} >
                <div className="p-5">

                    {active ?
                         <div className="flex justify-center flex-col items-center">
                         <div className="text-3xl my-2 border-b border-gray-500 w-full text-center mt-0 text-white">

                             Wallet Detail
                         </div>
                       
                          <div className="my-5">
                              <div className="flex items-center justify-between">
                            <div onClick={connect} className="text-md text-blue-200 text-center cursor-pointer hover:opacity-30 mt-5">
                                Account  : 
                            </div>
                            <div className="text-md text-blue-200 text-center cursor-pointer hover:opacity-30 mt-5">
                            {account}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                            <div onClick={connect} className="text-md text-blue-200 text-center cursor-pointer hover:opacity-30 mt-5">
                                Chain Id  : 
                            </div>
                            <div className="text-md text-blue-200 text-center cursor-pointer hover:opacity-30 mt-5">
                            {chainId}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                            <div onClick={connect} className="text-md text-blue-200 text-center cursor-pointer hover:opacity-30 mt-5">
                                Balance  : 
                            </div>
                            <div className="text-md text-blue-200 text-center cursor-pointer hover:opacity-30 mt-5">
                            {balance}
                                </div>
                              </div>
                           </div>

                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={disconnect}
                            >
                                Disconnect
                            </button>
                            </div>
                        :
                        <div className="flex justify-center flex-col items-center">
                            <div className="text-3xl my-2 border-b border-gray-500 w-full text-center mt-0 text-white">

                                Wallet Detail
                            </div>
                            <div className="text-xl my-4 text-white">
                                Wallet Not Connected
                            </div>
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={connect}
                            >
                                Connect
                            </button>
                        </div>
                    }

                </div>
            </Modal>
        </div>
    )
}

export default Wallet
