import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import psp22_contract from "../../contracts/psp22_calls";

const Home = () => {
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const extensionName = useSelector((s) => s.substrate.extensionName);
  const api = useSelector((s) => s.substrate.api);
  const [token_balance,setTokenBalance] = useState(0);
  const [balance,setBalance] = useState(0);
  const getBalance = async () => {
    if (!api) return;
    if (selectedAccount == '') return;
    await api.query.system
      .account(selectedAccount, (balance) => {

        if (balance.data.free)
          setBalance(balance.data.free / 10 ** 12);
        else
          setBalance(0);
      })
      .catch(console.error);
    let token_balance = await psp22_contract.balanceOf(selectedAccount,selectedAccount);
    // console.log(BET_balance);
    setTokenBalance(token_balance);
  }
  useEffect(() => {
    getBalance()
  }, [selectedAccount]);

  return (
    <>
     <div className='main--content-box'>
        <div className='section--titlebox'>
          <h2 className='section--subtitle'>  <span className='colorText'>Aleph Zero Dapp Scaffold</span></h2>
          <h2 className='section--subtitle'>Selected Account: {selectedAccount}</h2>
          <h2 className='section--subtitle'>extensionName: {extensionName}</h2>
          <h2 className='section--subtitle'>AZERO Balance: {balance}</h2>
          <h2 className='section--subtitle'>Token Balance: {token_balance}</h2>
        </div>

      </div>
    </>
  )
}

export default Home
