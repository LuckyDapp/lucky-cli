import {ApiPromise, Keyring, WsProvider} from '@polkadot/api';
import {KeyringPair} from '@polkadot/keyring/types';
import {CertificateData, OnChainRegistry, PinkContractPromise, signCertificate} from '@phala/sdk'
import { typeDefinitions } from '@polkadot/types'
import { types } from "@phala/sdk";
import {readFileSync} from 'fs';
import {config} from './config';

export let api : ApiPromise;

export let alice : KeyringPair;
export let aliceCertificate: CertificateData;

export let rafflePhatContract : PinkContractPromise;

export async function initConnection(){

    if (api){
        return;
    }

    api = await ApiPromise.create({
        provider: new WsProvider(config.phatContractRpc),
        noInitWarn: true,
        //types: { ...types, ...typeDefinitions }
    });
    const[chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);
    console.log('You are connected to chain %s using %s v%s', chain, nodeName, nodeVersion);

    alice = new Keyring({ type: 'sr25519' }).addFromUri("//Alice")
    aliceCertificate = await signCertificate({ api, pair: alice })

    const phatRegistry = await OnChainRegistry.create(api);
    const contractKey = await phatRegistry.getContractKey(config.rafflePhatContractAddress) as string;

    const rafflePhatContractMetadata = readFileSync(config.rafflePhatContractMetadata);
    const abi = JSON.parse(JSON.stringify(rafflePhatContractMetadata.toString()))
    rafflePhatContract = new PinkContractPromise(api, phatRegistry, abi, config.rafflePhatContractAddress, contractKey);

}
