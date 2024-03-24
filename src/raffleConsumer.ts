import {WeightV2} from '@polkadot/types/interfaces';
import {api, raffleConsumerSmartContract, alice} from './smartContractHelper';


export async function getNextEraInRaffleConsumer() : Promise<Number>{
       
    // maximum gas to be consumed for the call. if limit is too small the call will fail.
    const gasLimit: WeightV2 = api.registry.createType('WeightV2',
        {refTime: 30000000000, proofSize: 1000000}
    );
    
    // a limit to how much Balance to be used to pay for the storage created by the contract call
    // if null is passed, unlimited balance can be used
    const storageDepositLimit = null;
  
    const {result, output} = await raffleConsumerSmartContract.query['raffle::getNextEra'](alice.address, {gasLimit, storageDepositLimit});

    if (result.isOk){
        const value : string = output?.toString() ?? '';
        const era = JSON.parse(value).ok.ok as Number;
        console.log('Next era for the raffle: %s', era);
        return era;
    }
    return Promise.reject("ERROR when query raffle::getNextEra " + result.asErr);
}
