import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";

import {
  isValidAddressPolkadotAddress,
} from "../utils";
import { ContractPromise } from "@polkadot/api-contract";

let contract;

export const setPSP22Contract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};


async function balanceOf(caller_account,account) {
  if (!contract || !caller_account) {
    return null;
  }

  const gasLimit = -1;
  const azero_value = 0;
  if (!isValidAddressPolkadotAddress(account)) {
    toast.error(`invalid account`);
    return;
  }
  try {
    const { result, output } = await contract.query["psp22::balanceOf"](
      caller_account,
      { value: azero_value, gasLimit },
      account
    );
    if (result.isOk) {
      // console.log(output.toHuman());
      const a = output.toHuman().replace(/\,/g, "");
      return a / 10 ** 12;
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}
async function totalSupply(caller_account,account) {
  if (!contract || !caller_account) {
    return null;
  }

  const gasLimit = -1;
  const azero_value = 0;
  if (!isValidAddressPolkadotAddress(account)) {
    toast.error(`invalid account`);
    return;
  }
  try {
    const { result, output } = await contract.query["psp22::totalSupply"](
      caller_account,
      { value: azero_value, gasLimit },
      account
    );
    if (result.isOk) {
      // console.log(output.toHuman());
      const a = output.toHuman().replace(/\,/g, "");
      return a / 10 ** 12;
    }
  } catch (e) {
    console.log(e);
    return null;
  }

  return null;
}
async function mint(caller_account,source, mint_to, amount) {
  if (!contract || !caller_account) {
    return null;
  }

  if (parseInt(amount) <= 0 || !isValidAddressPolkadotAddress(caller_account)
  || !isValidAddressPolkadotAddress(mint_to)
  ) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe ;

  const gasLimit = -1;

  const injector = await web3FromSource(source);
  //bet_number: u32, is_over: u8, seed: String
  await contract.tx
    .play({ gasLimit, value: 0 }, mint_to, amount)
    .signAndSend(
      caller_account,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          toast.success(
            `Approve ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}
const contract_calls = {
  balanceOf,
  mint,
  totalSupply
};

export default contract_calls;
