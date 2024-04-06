import {
    OnChainRegistry,
    PinkContractPromise,
    getClient,
    getContract,
} from '@phala/sdk'
import {readFileSync} from 'fs';
import {config} from './config';

export let client : OnChainRegistry;

export let rafflePhatContract : PinkContractPromise;

export async function initConnection(){

    if (client){
        return;
    }

    client = await getClient({
        transport: config.phatContractRpc
    });
/*
    api = await ApiPromise.create(options({
        provider: new WsProvider(config.phatContractRpc),
        noInitWarn: true,
    }));
*/

    const[chain, nodeName, nodeVersion] = await Promise.all([
        client.api.rpc.system.chain(),
        client.api.rpc.system.name(),
        client.api.rpc.system.version()
    ]);
    console.log('You are connected to chain %s using %s v%s', chain, nodeName, nodeVersion);

    const abi = readFileSync(config.rafflePhatContractMetadata, 'utf-8');

    //const phatRegistry = await OnChainRegistry.create(api);
    //const contractKey = await phatRegistry.getContractKey(config.rafflePhatContractAddress) as string;
    //rafflePhatContract = new PinkContractPromise(api, phatRegistry, abi, config.rafflePhatContractAddress, contractKey);

    //const suri = '//Alice';
    //const provider = await KeyringPairProvider.createFromSURI(client.api, suri);

    rafflePhatContract = await getContract({
        client,
        contractId: config.rafflePhatContractAddress,
        abi,
        //provider,
        }
    )
}
