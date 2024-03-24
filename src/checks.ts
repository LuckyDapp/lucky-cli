import {WeightV2} from '@polkadot/types/interfaces';
import {
    alice,
    api,
    dAppStakingDeveloperSmartContract,
    raffleConsumerSmartContract,
    rewardManagerSmartContract
} from './smartContractHelper';
import {isDebug} from './luckyCli';
import {config} from './config';

export async function checkGrants() : Promise<void>{

    console.log('Check grants ... ');
  
    // maximum gas to be consumed for the call. if limit is too small the call will fail.
    const gasLimit: WeightV2 = api.registry.createType('WeightV2',
        {refTime: 6219235328, proofSize: 629760}
    );

    // a limit to how much Balance to be used to pay for the storage created by the contract call
    // if null is passed, unlimited balance can be used
    const storageDepositLimit = null;  

    const ROLE_WHITELISTED = api.registry.createType('u32', 754910830);
    const ROLE_REWARD_MANAGER = api.registry.createType('u32', 3562086346);
    const ROLE_GRANT_ATTESTOR = api.registry.createType('u32', 2852625541);

    const[hasRoleWhitelisted, hasRoleRewardManager, hasRoleGrantAttestor] = await Promise.all([
        dAppStakingDeveloperSmartContract.query['accessControl::hasRole'](
            alice.address, {gasLimit, storageDepositLimit},
            ROLE_WHITELISTED, config.raffleConsumerSmartContractAddress
        ),
        rewardManagerSmartContract.query['accessControl::hasRole'](
            alice.address, {gasLimit, storageDepositLimit},
            ROLE_REWARD_MANAGER, config.raffleConsumerSmartContractAddress
        ),
        raffleConsumerSmartContract.query['accessControl::hasRole'](
            alice.address, {gasLimit, storageDepositLimit},
            ROLE_GRANT_ATTESTOR, config.rafflePhatContractAttestorAddress
        ),
    ]);

    if (isDebug()){
        console.log('hasRoleWhitelisted %s - %s', hasRoleWhitelisted.result, hasRoleWhitelisted.output);
        console.log('hasRoleRewardManager %s - %s', hasRoleRewardManager.result, hasRoleRewardManager.output);
        console.log('hasRoleGrantAttestor %s - %s', hasRoleGrantAttestor.result, hasRoleGrantAttestor.output);
    }

    if (hasRoleWhitelisted.result.isOk){
        const value : string = hasRoleWhitelisted.output?.toString() ?? '';
        const hasRole = JSON.parse(value).ok as Boolean;
        if (!hasRole){
            return Promise.reject("ERROR: the raffle contract is not whitelisted in the developer contract");
        }
    } else {
        return Promise.reject("ERROR when query dAppStakingDeveloperContract.accessControl::hasRole " + hasRoleWhitelisted.result.asErr);
    }

    if (hasRoleRewardManager.result.isOk){
        const value : string = hasRoleRewardManager.output?.toString() ?? '';
        const hasRole = JSON.parse(value).ok as Boolean;
        if (!hasRole){
            return Promise.reject("ERROR: the raffle contract cannot push data is not the reward manager");
        }
    } else {
        return Promise.reject("ERROR when query rewardManagerContract.accessControl::hasRole " + hasRoleRewardManager.result.asErr);
    }
    
    if (hasRoleGrantAttestor.result.isOk){
        const value : string = hasRoleGrantAttestor.output?.toString() ?? '';
        const hasRole = JSON.parse(value).ok as Boolean;
        if (!hasRole){
            return Promise.reject("ERROR: the phat contract is not granted in the smart contract consumer");
        }
    } else {
        return Promise.reject("ERROR when query raffleConsumerContract.accessControl::hasRole " + hasRoleGrantAttestor.result.asErr);
    }
    
    console.log('Check grants Ok');
}


export async function checkRaffleConsumerConfiguration() : Promise<void>{

    console.log('Check Raffle Consumer Configuration ... ');

    // maximum gas to be consumed for the call. if limit is too small the call will fail.
    const gasLimit: WeightV2 = api.registry.createType('WeightV2',
        {refTime: 6219235328, proofSize: 629760}
    );

    // a limit to how much Balance to be used to pay for the storage created by the contract call
    // if null is passed, unlimited balance can be used
    const storageDepositLimit = null;

    const[
        getRewardManagerAddressOutcome,
        getDappsStakingDeveloperAddressOutcome,
        getTotalRatioDistributionOutcome,
        getRatioDistributionOutcome
    ] = await Promise.all([
        raffleConsumerSmartContract.query.getRewardManagerAddress(
            alice.address, {gasLimit, storageDepositLimit}
        ),
        raffleConsumerSmartContract.query.getDappsStakingDeveloperAddress(
            alice.address, {gasLimit, storageDepositLimit}
        ),
        raffleConsumerSmartContract.query['raffle::getTotalRatioDistribution'](
            alice.address, {gasLimit, storageDepositLimit}
        ),
        raffleConsumerSmartContract.query['raffle::getRatioDistribution'](
            alice.address, {gasLimit, storageDepositLimit}
        )
    ]);

    if (getDappsStakingDeveloperAddressOutcome.result.isOk){
        const output : string = getDappsStakingDeveloperAddressOutcome.output?.toString() ?? '';
        const address = JSON.parse(output).ok;
        console.log('DAppStakingDeveloperContractAddress: %s', address);
        if (address != config.dAppStakingDeveloperSmartContractAddress){
            return Promise.reject('ERROR: dAppStakingDeveloperContractAddress set in the raffle contract is not the same : ' + address + ' <> ' + config.dAppStakingDeveloperSmartContractAddress);
        }
    } else {
        return Promise.reject('ERROR when query getDappsStakingDeveloperAddress ' + getDappsStakingDeveloperAddressOutcome.result.asErr);
    }

    if (getRewardManagerAddressOutcome.result.isOk){
        const output : string = getRewardManagerAddressOutcome.output?.toString() ?? '';
        const address = JSON.parse(output).ok;
        console.log('RewardManagerContractAddress: %s', address);
        if (address != config.rewardManagerSmartContractAddress){
            return Promise.reject('ERROR: rewardManagerContractAddress set in the raffle contract is not the same : ' + address + ' <> ' + config.rewardManagerSmartContractAddress);
        }
    } else {
        return Promise.reject('ERROR when query getDappsStakingDeveloperAddress ' + getRewardManagerAddressOutcome.result.asErr);
    }

    if (getTotalRatioDistributionOutcome.result.isOk){
        const output : string = getTotalRatioDistributionOutcome.output?.toString() ?? '';
        const value = JSON.parse(output).ok;
        console.log('Total ratio distribution: %s', value);
        if (value <= 0){
            return Promise.reject('ERROR: totalRatioDistribution is not set in the raffle contract : ' + value);
        }
    } else {
        return Promise.reject('ERROR when query getTotalRatioDistribution ' + getTotalRatioDistributionOutcome.result.asErr);
    }

    if (getRatioDistributionOutcome.result.isOk){
        const output : string = getRatioDistributionOutcome.output?.toString() ?? '';
        const value = JSON.parse(output).ok as Array<Number>;
        console.log('Ratio distribution: %s', value);
        if (value == null || value.length == 0){
            return Promise.reject('ERROR: ratioDistribution is not set in the raffle contract : ' + value);
        }
    } else {
        return Promise.reject('ERROR when query getRatioDistribution ' + getRatioDistributionOutcome.result.asErr);
    }

    console.log('Check configuration Ok');
}