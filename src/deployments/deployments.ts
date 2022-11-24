import { usePolkadotProviderContext } from "../contracts/PolkadotProvider.tsx";
import { Abi, ContractPromise } from "@polkadot/api-contract";
import { env } from "@shared/environment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * All deployed contracts for ABIs and/or addresses below
 * NOTE: Add new contracts here
 * IMPORTANT: The respective abi & address jsons must be under `/packages/contracts/${contract}/deployments/`
 */
export enum ContractKeys {
  greeter = "greeter",
  stake_voting = "stake_voting",
}

/**
 * IMPORTANT: CHANGE NOTHING BELOW JUST FOR ADDING CONTRACTS
 * Imports are inferred dynamically from `ContractKeys` and `supportedChains` from the environment.
 */

/**
 * (Deployed) contract addresses by network identifier
 */
export type AddressesType = { [_: string]: Promise<{ address: string }> };
export type AllAddressesType = { [_ in ContractKeys]: AddressesType };
export const allAddresses = Object.keys(ContractKeys).reduce<AllAddressesType>(
  (acc: any, contract: string) => ({
    ...acc,
    [contract]: "5HPwzKmJ6wgs18BEcLdH5P3mULnfnowvRzBtFcgQcwTLVwFc",
  }),
  {} as AllAddressesType
);

/**
 * (Deployed) contract abis
 */
export type AllABIsType = { [_ in ContractKeys]: Promise<Abi> };
export const allABIs = Object.keys(ContractKeys).reduce<AllABIsType>(
  (acc: any, contract: string) => ({
    ...acc,
    [contract]: import(`../contracts/${contract}/deployments/metadata.json`),
  }),
  {} as AllABIsType
);

/**
 * Helper hook to access abis and addresses by active chain
 */
export const useDeployment = (key: ContractKeys) => {
  //const { api, activeChain } = usePolkadotProviderContext();
  const api = useSelector((s) => s.substrate.api);

  const [contractABI, setContractABI] = useState<object>();
  const [contractAddress, setContractAddress] = useState<string>();
  const [contract, setContract] = useState<ContractPromise>();
  let address;

  const update = async () => {
    /*if (!activeChain?.network) {
      setContractABI(undefined);
      setContractAddress(undefined);
      setContract(undefined);
      return;
    }*/
    const abi = await allABIs[key];
    setContractABI(abi);
    if (key == "greeter") {
      address = "5HPwzKmJ6wgs18BEcLdH5P3mULnfnowvRzBtFcgQcwTLVwFc"; //(await allAddresses[key]?.[activeChain?.network])?.address; }
    } else {
      address = "5Ch6wUot9ugHeJtZiW2kF3Cdb8NHFhGkiceseYPXkperVZgu"; //(await allAddresses[key]?.[activeChain?.network])?.
    }
    setContractAddress(address);
    const contract =
      api && address ? new ContractPromise(api, abi, address) : undefined;
    setContract(contract);
  };
  useEffect(() => {
    update();
  }, [api]);

  //console.log(contractABI);

  return {
    contractABI,
    contractAddress,
    contract,
  };
};
