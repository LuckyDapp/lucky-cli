import {api} from './smartContractHelper';
import {config} from './config';
import {SubmittableExtrinsic} from "@polkadot/api/types";
import type {ISubmittableResult} from "@polkadot/types/types";
import {setTimeout} from "timers/promises";
import {isDebug} from "./luckyCli";
import {Keyring} from "@polkadot/api";
import {seed} from "./seed";

export async function getCurrentEra() : Promise<Number>{
    const currentEraInfo = await api.query.dappStaking.currentEraInfo();
    if (currentEraInfo == undefined){
        return Promise.reject('currentEraInfo is undefined');
    }
    const currentEraInfoJson = JSON.parse(currentEraInfo.toString());

    if (currentEraInfoJson == undefined){
        return Promise.reject('currentEraInfoJson is undefined');
    }
    const currentEra = (Number) (currentEraInfoJson.currentStakeAmount.era);
    console.log('Current era for dApp staking: %s', currentEra);
    return currentEra;
}

export async function claimDAppStaking(
    era: Number
) : Promise<void>{

    console.log('Claim dApp Staking ...');

    const tx = api.tx.dappStaking.claimDappReward(
        {wasm : config.dAppStakingApplicationSmartContractAddress},
        era
    );

    await signAndSend(tx);

    console.log('Claim dApp Staking  Ok');    
}


async function signAndSend(
    extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult>
) : Promise<void> {

    let extrinsicResult : ExtrinsicResult = {success: false, failed: false, finalized: false };

    const keyPair = new Keyring({ type: 'sr25519'}).addFromUri(seed.seed);

    const unsub = await extrinsic.signAndSend(
        keyPair,
        (result) => {
            if (readResult(result, extrinsicResult)) {
                unsub();
            }
        }
    );

    do {
        // wait 10 seconds
        await setTimeout(10000);
        // until the transaction has been finalized (or failed)
    } while (!extrinsicResult.failed && !extrinsicResult.finalized);

    if (extrinsicResult.failed){
        return Promise.reject("ERROR: Extrinsic failed");
    }

}


type ExtrinsicResult = {
    success: boolean;
    failed: boolean;
    finalized: boolean;
}

function readResult(result: ISubmittableResult, extrinsicResult: ExtrinsicResult) : boolean {

    let r = false;
    console.log('Transaction status:', result.status.type);

    if (result.status.isInBlock || result.status.isFinalized) {
        console.log('Transaction hash ', result.txHash.toHex());
        extrinsicResult.finalized = result.status.isFinalized;

        //result.events.forEach(({ phase, event : {data, method, section}} ) => {
        result.events.forEach(({ phase, event} ) => {
            let data = event.data;
            let method = event.method;
            let section = event.section;
            if (isDebug()){
                console.log(' %s : %s.%s:: %s', phase, section, method, data);
            }
            if (section == 'system' && method == 'ExtrinsicSuccess'){
                extrinsicResult.success = true;
                return true;
            } else if (section == 'system' && method == 'ExtrinsicFailed'){
                extrinsicResult.failed = true;
                console.log(' %s : %s.%s:: %s', phase, section, method, data);
                return true;
            }
        });
    } else if (result.isError){
        console.log('Error');
        extrinsicResult.failed = true;
        return true;
    }
    return false;
}