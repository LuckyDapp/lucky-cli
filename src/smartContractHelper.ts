import {ApiPromise, Keyring, WsProvider} from '@polkadot/api';
import {ContractPromise} from '@polkadot/api-contract';
import {KeyringPair} from "@polkadot/keyring/types";
import {readFileSync} from 'fs';
import {config} from './config';

export let api : ApiPromise;
export let alice : KeyringPair;

export let dAppStakingDeveloperSmartContract : ContractPromise;
export let rewardManagerSmartContract : ContractPromise;
export let raffleConsumerSmartContract : ContractPromise;

export async function initConnection(){

    if (api){
        // already initialized
        return;
    }

    api = await ApiPromise.create({ provider: new WsProvider(config.smartContractRpc)});
    const[chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);
    console.log('You are connected to chain %s using %s v%s', chain, nodeName, nodeVersion);

    alice = new Keyring({ type: 'sr25519' }).addFromUri("//Alice")

    const dAppStakingDeveloperContractMetadata = readFileSync(config.dAppStakingDeveloperSmartContractMetadata);
    dAppStakingDeveloperSmartContract = new ContractPromise(api, dAppStakingDeveloperContractMetadata.toString(), config.dAppStakingDeveloperSmartContractAddress);
    const rewardManagerContractMetadata = readFileSync(config.rewardManagerSmartContractMetadata);
    rewardManagerSmartContract = new ContractPromise(api, rewardManagerContractMetadata.toString(), config.rewardManagerSmartContractAddress);
    const raffleContractMetadata = readFileSync(config.raffleConsumerSmartContractMetadata);
    raffleConsumerSmartContract = new ContractPromise(api, raffleContractMetadata.toString(), config.raffleConsumerSmartContractAddress);

}

