import fetch from 'node-fetch';
import { config } from './config';
import { isDebug } from './luckyCli';

export async function getLastEraReceivedReward(): Promise<Number> {

    try {    
        const body = { query : 'query {dAppRewards(orderBy: ERA_DESC, first:1) {nodes {era}}}' };

        if (isDebug()){
            console.log('POST %s', config.subqlUrl );
            console.log(body);
        }

        const response = await fetch(config.subqlUrl, {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (isDebug()){
            console.log('Response status: %s', response.statusText);
        }        

        const data = await response.text();

        if (isDebug()){
            console.log(data);
        }

        const era = JSON.parse(data).data.dAppRewards.nodes[0].era;
        console.log('Last era when the dApp received the rewards: %s', era);
        return era;

    } catch(error) {
        console.log("Error when getting last era when the dapp received some rewards : %s", error);
        return Promise.reject(error);
    }

}

export type EraInfo = {
    era: number;
    period: number;
    subPeriod: string;
}

export async function getEraInfo(
    era: Number
): Promise<EraInfo> {

    console.log('Get period / sub-period for era %s ... ', era);

    try {
        const body1 = { query : `query {dAppStakingEras(filter: {era: {equalTo: \"${era}\"}}){nodes{ era, blockNumber}}}` };

        if (isDebug()){
            console.log('POST %s', config.subqlUrl );
            console.log(body1);
        }

        const response1 = await fetch(config.subqlUrl, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify(body1)
        });

        if (isDebug()){
            console.log('Response status: %s', response1.statusText);
        }

        const data1 = await response1.text();

        if (isDebug()){
            console.log(data1);
        }

        const result1 = JSON.parse(data1).data.dAppStakingEras.nodes[0];
        const blockNumber = result1.blockNumber;
        console.log('Block Number for era %s: %s', result1.era, blockNumber);

        const body2 = { query : `query {dAppSubPeriods(filter: {blockNumber: {lessThanOrEqualTo: \"${blockNumber}\"}}, first: 1, orderBy: BLOCK_NUMBER_DESC){nodes{ period, subPeriod, blockNumber}}}` };

        if (isDebug()){
            console.log('POST %s', config.subqlUrl );
            console.log(body2);
        }

        const response2 = await fetch(config.subqlUrl, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify(body2)
        });

        if (isDebug()){
            console.log('Response status: %s', response2.statusText);
        }

        const data2 = await response2.text();

        if (isDebug()){
            console.log(data2);
        }

        const result2 = JSON.parse(data2).data.dAppSubPeriods.nodes[0];
        const period = result2.period;
        const subPeriod = result2.subPeriod;
        console.log('Period %s and sub-period %s for era %s', period, subPeriod, era);

        return {
            era: era.valueOf(),
            period,
            subPeriod
        };

    } catch(error) {
        console.log("Error when getting era info : %s", error);
        return Promise.reject(error);
    }
}
