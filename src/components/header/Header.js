import React, { useEffect, useState } from "react";
import "./Header.css";

import { Link } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";

import toast from "react-hot-toast";
import { navItemData, walletData } from "../../constants/data";
import { truncateStr } from "../../utils";
import { useDispatch, useSelector } from "react-redux";

import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable } from "../../wallets/extension-dapp";
import { keyring as Keyring } from "@polkadot/ui-keyring";

import { setPSP22Contract } from "../../contracts/psp22_calls";
import psp22_contract from "../../contracts/psp22";

let socket = "wss://ws.test.azero.dev"; //"wss://ws-smartnet.test.azero.dev"; //"wss://ws.test.azero.dev";
let app_name = "operator_stake_governance";
let _api = null;

function Header() {
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);
  const [active, setActive] = useState("home");

  const [selected, setWallet] = useState(null);
  const handleClick = () => setClick(!click);

  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [connected, setConnected] = useState(false);
  const asyncLoadAccounts = async (wallet) => {
    try {
      await web3Enable(app_name, [], wallet);

      let allAccounts = await web3Accounts();

      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name}` },
      }));

      try {
        Keyring.loadAll({ isDevelopment: false }, allAccounts);
      } catch (error) {
        allAccounts.forEach(({ address, meta }) => {
          Keyring.saveAddress(address, meta);
        });
      }
      //console.log(allAccounts);
      setAccounts(allAccounts);
      if (allAccounts.length > 0) {
        setSelectedAccount(allAccounts[0].address);
        dispatch({
          type: "setSelectedAccount",
          payload: allAccounts[0].address,
        });
      } else {
        setSelectedAccount("");
        toast.error(
          "Wallet Extension not found or no accounts linked to this wallet"
        );
      }
      //dispatch({ type: "SET_KEYRING", payload: Keyring });
    } catch (e) {
      console.error(e);
      //dispatch({ type: "KEYRING_ERROR" });
      toast.error(
        "Wallet Extension not found or no accounts linked to this wallet"
      );
    }
  };

  useEffect(() => {
    if (connected) return;
    console.log(`Connected socket: ${socket}`);
    toast("Connecting to AZero network...");
    const provider = new WsProvider(socket);
    _api = new ApiPromise({
      provider,
      rpc: jsonrpc,
    });
    _api.on("connected", () => {
      _api.isReady.then((_api) => {
        toast("Connected to AZero network");
      });
    });

    _api.on("ready", () => {
      dispatch({ type: "setAPI", payload: _api });
      setPSP22Contract(_api, psp22_contract);
    });

    _api.on("error", (err) => {
      console.log(err);
      toast.error("Something wrong while connecting to AZero network");
    });
  }, []);

  const selectWallet = (data) => {
    if (!_api) {
      toast.error("Not connected to Azero network yet.");
    }
    setConnected(true);
    //Connect to Wallet
    setSelectedWallet(data);
    asyncLoadAccounts(data.extensionName);
    dispatch({ type: "setExtensionName", payload: data.extensionName });
  };

  const selectAccount = (account) => {
    // console.log(account);
    setSelectedAccount(account);
    handleClick();
    dispatch({ type: "setSelectedAccount", payload: account });
    //console.log(selectedAccountRedux);
  };
  const onDisconnect = () => {
    setSelectedAccount("");
    setSelectedWallet(null);
    setConnected(false);
    setAccounts([]);
  };
  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="header-container bg-neutral/90 backdrop-blur-md shadow-md">
          <div className="brand__logo">
            <div>
              <Link to="/" className="header-brand-logo">
                🔓 OPERATOR GOVERNANCE
              </Link>
            </div>
            <div className="mobile-navbar-trigger" onClick={handleClick}>
              <span>{click ? <BiX /> : <BiMenu />}</span>
            </div>
          </div>
          <div
            style={{ display: `${click ? "flex" : ""}` }}
            className="header-wrapper"
          >
            <div className={click ? "navbar-navbox open" : "navbar-navbox"}>
              <ul className="header-btnbox">
                <li className="header-walletbtnbox">
                  <div className="wallet__btn btn-styled selected__box">
                    {selectedAccount != "" ? (
                      <div className="header-walletbtn selected__box">
                        <img
                          src={selectedWallet.icon}
                          alt={selectedWallet.name}
                          width="30"
                        />
                        <h4>{truncateStr(selectedAccount, 4)}</h4>
                      </div>
                    ) : (
                      <div className="btn-styled">
                        <h4>Select wallet</h4>
                      </div>
                    )}
                  </div>
                  {!connected ? (
                    <ul className="drop__down__content">
                      <h4>Select your wallet</h4>
                      {walletData.map((data) => (
                        <div
                          onClick={() => selectWallet(data)}
                          id={data.id}
                          className="drop__down_item"
                        >
                          <img src={data.icon} alt={data.name} width="30" />
                          <li className="drop__down_btn">{data.name}</li>
                        </div>
                      ))}
                      {/*<li className='limit__btn' onClick={() => value ? setValue(null) : setValue(walletData.length / 2)}>
                      {value ? "more option" : "less option"}
                      <span>
                        {value ?
                          <IoIosArrowDown /> :
                          <IoIosArrowUp />}
                      </span>
                    </li>*/}
                    </ul>
                  ) : (
                    <ul className="drop__down__content">
                      <h4>Select your accounts</h4>
                      {accounts.map((data) => (
                        <div
                          onClick={() => selectAccount(data.address)}
                          id={data.address}
                          className="drop__down_item"
                        >
                          <li className="drop__down_btn">
                            {data.meta.name.length > 12
                              ? data.meta.name.substr(0, 12) + "..."
                              : data.meta.name}{" "}
                            {truncateStr(data.address)}
                          </li>
                        </div>
                      ))}
                      <div
                        onClick={() => onDisconnect()}
                        className="drop__down_item"
                      >
                        <li className="drop__down_btn">Disconnect</li>
                      </div>
                    </ul>
                  )}
                </li>
                {/*
                  selected &&
                  <li className='selected__balance'>
                    <h6>
                      {selected.balance}
                    </h6>
                  </li>
                */}
                {/*<li className='header-settingbtnbox'>
                  <Link to="/" className='header-settingsbtn' >
                    <img src={images.settings} alt="settingsImg" />
                  </Link>
                </li>*/}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
