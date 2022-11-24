import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import psp22_contract from "../../contracts/psp22_calls";
import { ContractKeys, useDeployment } from "../../deployments/deployments.ts";
import { truncateStr } from "../../utils";
/*import {
  web3FromSource,
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "../../wallets/extension-dapp";*/
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";

const Home = () => {
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const extensionName = useSelector((s) => s.substrate.extensionName);
  const api = useSelector((s) => s.substrate.api);
  const [token_balance, setTokenBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  const [greeterMessage, setGreeterMessage] = useState();
  const [operatorMsg, setoperatorMsg] = useState([]);
  const [fetchIsLoading, setFetchIsLoading] = useState(true);
  const [operatorIsLoading, setOperatorIsLoading] = useState(true);
  const greetContract = useDeployment(ContractKeys.greeter);
  const operatorContract = useDeployment(ContractKeys.stake_voting);
  const [operatorList, setOperatorList] = useState([
    {
      stakeOperatorId: "",
      name: "",
      ownStaked: "",
      otherStaked: "",
      commission: "",
      totalStakers: "",
      votePoints: "",
    },
  ]);
  // Update Greeting
  const updateGreeting = async (msg) => {
    if (!selectedAccount || !operatorContract.contract) {
      //toast.error("Wallet not connected. Try again…");
      return;
    }

    console.log(api);
    api.setSigner(selectedAccount);

    //setUpdateIsLoading(true);
    try {
      // Gather form value
      const newMessage = msg; //form.getValues("newMessage");

      // Estimate gas
      const { gasRequired } = await operatorContract.contract.query.addVote(
        selectedAccount,
        { storageDepositLimit: null, gasLimit: -1 },
        newMessage
      );
      const gasLimit = gasRequired.toNumber() * 1.5;

      const allInjected = await web3Enable("my cool dapp");

      const allAccounts = await web3Accounts();

      const injector = await web3FromAddress(selectedAccount);
      //, { signer: injector.signer }

      // Execute transaction
      await operatorContract.contract.tx
        .addVote({ gasLimit }, newMessage)
        .signAndSend(selectedAccount, { signer: injector.signer }, (result) => {
          if (result?.status?.isInBlock) fetchGreeting();
        });
      //toast.success(`Successfully updated greeting`);
    } catch (e) {
      console.error(e);
      //toast.error("Error while updating greeting. Try again.");
    } finally {
      //setUpdateIsLoading(false);
    }
  };
  const listItems = operatorList.map((i, index) => (
    <tr className="hover self-center center" key={index}>
      <td className="">{i.name}</td>
      <td className="">{truncateStr(i.stakeOperatorId.toString(), 4)}</td>
      <td className="">
        {(Number(i.ownStaked) + Number(i.otherStaked)).toString()} AZERO
      </td>
      <td className="">{i.ownStaked.toString()}</td>
      <td className="">{i.otherStaked.toString()}</td>
      <td className="">{i.totalStakers.toString()}</td>
      <td className="">{i.commission.toString()}%</td>
      <td className="">{i.votePoints.toString()}</td>
      <td className="">
        <button
          className="btn btn-sm btn-success"
          onClick={() => updateGreeting(i.stakeOperatorId.toString())}
        >
          Vote
        </button>
      </td>
    </tr>
  ));
  const getBalance = async () => {
    if (!api) return;
    if (selectedAccount == "") return;
    await api.query.system
      .account(selectedAccount, (balance) => {
        if (balance.data.free) setBalance(balance.data.free / 10 ** 12);
        else setBalance(0);
      })
      .catch(console.error);
    let token_balance = await psp22_contract.balanceOf(
      selectedAccount,
      selectedAccount
    );
    // console.log(BET_balance);
    setTokenBalance(token_balance);
  };
  // Fetch Greeting
  const fetchGreeting = async () => {
    if (!greetContract.contract) return;
    setFetchIsLoading(true);
    try {
      const { result, output } = await greetContract.contract.query.greet(
        "",
        {}
      );
      let message = output?.toString();
      if (!result?.isOk) throw new Error(result.toString());
      setGreeterMessage(message);
    } catch (e) {
      console.error(e);
      //toast.error("Error while fetching greeting. Try again…");
      setGreeterMessage(undefined);
    } finally {
      setFetchIsLoading(false);
    }
  };
  // Fetch list of operators and their votes
  const fetchOperators = async () => {
    if (!operatorContract.contract) return;
    setOperatorIsLoading(true);
    console.log(operatorContract.contract);
    try {
      const { result, output } =
        await operatorContract.contract.query.getStakeOperators("", {});
      const message = output?.toString();
      if (!result?.isOk) throw new Error(result.toString());
      setoperatorMsg(message);
      setOperatorList(output);
      //console.log(output);
    } catch (e) {
      console.error(e);
      //toast.error("Error while fetching greeting. Try again…");
      setoperatorMsg(undefined);
    } finally {
      setOperatorIsLoading(false);
    }
  };
  useEffect(() => {
    getBalance();
    fetchGreeting();
    fetchOperators();
  }, [selectedAccount, greetContract.contract, operatorContract.contract]);

  function OperatorsGrid() {
    return (
      <div className="center grid gap-5 grid-cols-4 self-center">
        {operatorIsLoading
          ? "Loading…"
          : operatorList.map((i, index) => (
              <div className="indicator w-100%">
                <span className="indicator-item badge badge-secondary">
                  {i.votePoints.toString()}
                </span>
                <div className="card p-2" key={index}>
                  <div className="stats pt-4 pb-4 bg-primary text-primary-content stats-vertical shadow">
                    <div className="stat w-80">
                      <div className="stat-title">
                        {truncateStr(i.stakeOperatorId.toString(), 4)}
                      </div>
                      <div className="stat-value flex justify-between">
                        <span className="inline-block align-middle">
                          {i.name.substr(0, 11 - 1) + "..."}
                        </span>
                      </div>
                      <div className="stat-actions flex justify-between align-middle">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            updateGreeting(i.stakeOperatorId.toString())
                          }
                        >
                          Vote
                        </button>
                        <div className="stat-desc mt-2">
                          Commission: {i.commission.toString()}%
                        </div>
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Total stake</div>
                      <div className="stat-value">
                        {(
                          Number(i.ownStaked) + Number(i.otherStaked)
                        ).toString()}{" "}
                        AZERO
                      </div>
                      <div className="stat-actions">
                        <span className="stat-desc">
                          Own stake: {i.ownStaked.toString()}
                        </span>
                        <span className="stat-desc ml-5">
                          Participants stake: {i.otherStaked.toString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    );
  }

  function OperatorsList() {
    return (
      <div>
        <div className="overflow-x-auto grid place-items-center mt-20">
          <table className="table w-1/2">
            <thead>
              <tr>
                <th className="bg-primary">Operator name</th>
                <th className="bg-primary">Operator id</th>
                <th className="bg-primary">Total stake</th>
                <th className="bg-primary">Own stake</th>
                <th className="bg-primary">Participants stake</th>
                <th className="bg-primary">Amount of stakers</th>
                <th className="bg-primary">Commission</th>
                <th className="bg-primary">Points from votes</th>
                <th className="bg-primary"></th>
              </tr>
            </thead>
            <tbody>{operatorIsLoading ? "Loading…" : listItems}</tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden flex flex-col">
        {!null ? (
          ""
        ) : (
          <div className="section--titlebox">
            <h2 className="section--subtitle">
              {" "}
              <span className="colorText">Aleph Zero Dapp Scaffold</span>
            </h2>
            <h2 className="section--subtitle">
              Selected Account: {selectedAccount}
            </h2>
            <h2 className="section--subtitle">
              extensionName: {extensionName}
            </h2>
            <h2 className="section--subtitle">AZERO Balance: {balance}</h2>
            <h2 className="section--subtitle">
              Token Balance: {token_balance}
            </h2>
          </div>
        )}
        <h1 className="font-extrabold text-transparent text-9xl self-center mt-72 mb-10 pb-16 bg-clip-text bg-gradient-to-r from-primary to-purple-400 ">
          Operator governance
        </h1>
        <p className="font-extrabold text-xl self-start self-center mt-0 mb-0 text-gray-400">
          Vote and view information on Aleph Zero stake operators seamlessly
          directly from UI.
        </p>
        <label className="swap swap-flip text-9xl mt-20 mb-20">
          <input type="checkbox" />

          <div className="swap-on">📃</div>
          <div className="swap-off">📇</div>
        </label>
        {true ? (
          <div className="self-center">
            <OperatorsGrid />
          </div>
        ) : (
          <OperatorsList />
        )}
      </div>
    </>
  );
};

export default Home;
