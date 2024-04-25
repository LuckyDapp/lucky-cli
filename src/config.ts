
import { initSeedConfig } from './seed';


interface Config {
    readonly smartContractRpc: string;
    readonly phatContractRpc: string;
    readonly dAppStakingApplicationSmartContractAddress: string;
    readonly dAppStakingDeveloperSmartContractAddress: string;
    readonly rewardManagerSmartContractAddress: string;
    readonly raffleConsumerSmartContractAddress: string;
    readonly rafflePhatContractAddress: string;
    readonly rafflePhatContractAttestorAddress: string;
    readonly subqlUrl: string;
    readonly dAppStakingDeveloperSmartContractMetadata: string;
    readonly rewardManagerSmartContractMetadata: string;
    readonly raffleConsumerSmartContractMetadata: string;
    readonly rafflePhatContractMetadata: string;
}


class ShibuyaConfig implements Config {

    // shibuya: wss://rpc.shibuya.astar.network
    // shibuya: wss://shibuya-rpc.dwellir.com
    smartContractRpc = 'wss://rpc.shibuya.astar.network';
    phatContractRpc = 'wss://poc6.phala.network/ws';
    dAppStakingApplicationSmartContractAddress = 'Xz3sHvmRgRY3mt3qQ3SjZ3aUPQTfHkj4rKeoQM6VJrenD3W';
    dAppStakingDeveloperSmartContractAddress = 'WayJSoeDvHLJ8rXPqrPyQQwznntbxvjwvmq1AKBpu9phYHr';
    rewardManagerSmartContractAddress = 'X8nqJsFQWBk137WxetcPdAGLwnJ8xpAQ5tXS1bNsHKaz1q6';
    raffleConsumerSmartContractAddress = 'WxB2uwWr1JmUZofp1amiKUcsjtsCZKTUBZg4MWf3HJoMQuY';
    rafflePhatContractAddress = "0xb9dd82761d4501791dd284ff97ceb4ffa0b6d928b3b466353ddc1228bd7622dd";
    rafflePhatContractAttestorAddress = "ZCYYxa5DAF6UMBVfNT9wDbRNf4imiugXa6jtC8Xdp8T35cM";
    subqlUrl = 'https://query.substrate.fi/lucky-subquery-shibuya';
    dAppStakingDeveloperSmartContractMetadata = './metadata/shibuya/dapps_staking_developer_metadata.json';
    rewardManagerSmartContractMetadata = './metadata/astar/reward_manager_metadata.json';
    raffleConsumerSmartContractMetadata = './metadata/shibuya/raffle_consumer_metadata.json';
    rafflePhatContractMetadata = "./metadata/shibuya/raffle_metadata.json";
}

class ShidenConfig implements Config {

    // wss://rpc.shiden.astar.network
    // wss://shiden-rpc.dwellir.com
    // wss://shiden.api.onfinality.io/public-ws
    smartContractRpc = 'wss://rpc.shiden.astar.network';
    phatContractRpc = 'wss://api.phala.network/ws';
    dAppStakingApplicationSmartContractAddress = 'X6ykUS6L6CH4EoZitZsYJsCxH2AGk2ky9G6a2xeu1W9ffTP';
    dAppStakingDeveloperSmartContractAddress = 'aqcmQUATZiaHmZtueE5chfSZRTvsvtSpmx57fZBhktDt4Rm';
    rewardManagerSmartContractAddress = 'X6yBHZm9MGzedCVBn6nGHHUDxEnjUNzSoN4aqAP4qooQpEU';
    raffleConsumerSmartContractAddress = 'W5pzj2pfkkvsNbyLCSA92G5VNYWmxvS86EiN9Kog6PrTfij';
    rafflePhatContractAddress = "0xfc93a4d54159c580fa015e64d9a9d261f328043947815e3020bc8909f5e0c7f3";
    rafflePhatContractAttestorAddress = "ZJvvMEBuSzo374xtFaHNGbKrbwNhK9oVmUGKVtXFDPYF1jK";
    subqlUrl = 'https://query.substrate.fi/lucky-subquery-shiden';
    dAppStakingDeveloperSmartContractMetadata = './metadata/shiden/dapps_staking_developer_metadata.json';
    rewardManagerSmartContractMetadata = './metadata/shiden/reward_manager_metadata.json';
    raffleConsumerSmartContractMetadata = './metadata/shiden/raffle_consumer_metadata.json';
    rafflePhatContractMetadata = "./metadata/shiden/raffle_metadata.json";
}

class AstarConfig implements Config {

    smartContractRpc = 'wss://rpc.astar.network';
    phatContractRpc = 'wss://api.phala.network/ws';
    dAppStakingApplicationSmartContractAddress = 'ZSV1GVepvmWFdshMWgczS4zYvmmwEsBjWQjN4WDpUEFRRPy';
    dAppStakingDeveloperSmartContractAddress = 'ZEUr1PBaxshhhPcF4jeVFVoC6BwCDYj48UsJ5ShquWN2yeE';
    rewardManagerSmartContractAddress = 'ZSV1GVepvmWFdshMWgczS4zYvmmwEsBjWQjN4WDpUEFRRPy';
    raffleConsumerSmartContractAddress = 'XPC4BUeSHhTWqzUdUWtW1cTNHhktNPgenKZ4qq2FkKR2two';
    rafflePhatContractAddress = "41mr9YDW65QyA5EYF3h4KrAXe9oedRKAXxVtxTDDGRaEAEgM";
    rafflePhatContractAttestorAddress = "null";
    subqlUrl = 'https://query.substrate.fi/lucky-subquery-astar';
    dAppStakingDeveloperSmartContractMetadata = './metadata/astar/dapps_staking_developer_metadata.json';
    rewardManagerSmartContractMetadata = './metadata/astar/reward_manager_metadata.json';
    raffleConsumerSmartContractMetadata = './metadata/astar/lucky_raffle_metadata.json';
    rafflePhatContractMetadata = "null";
}

export let config : Config;

export function initConfiguration(network: string) {
    console.log('Set config for %s', network);
    if (network == 'shibuya'){
        config = new ShibuyaConfig();
    } else if (network == 'shiden'){
        config = new ShidenConfig();
    } else if (network == 'astar'){
        config = new AstarConfig();
    } else {
        throw new Error("No config for this Network");
    }
    initSeedConfig(network);
}

export function displayConfiguration(){
    console.log('Smart Contract RPC: %s', config.smartContractRpc);
    console.log('Phat Contract RPC: %s', config.phatContractRpc);
    console.log('dAppStaking application contract address: %s', config.dAppStakingApplicationSmartContractAddress);
    console.log('dAppStaking developer contract address: %s', config.dAppStakingDeveloperSmartContractAddress);
    console.log('reward manager contract address: %s', config.rewardManagerSmartContractAddress);
    console.log('raffle consumer contract address: %s', config.raffleConsumerSmartContractAddress);
    console.log('raffle contract address: %s', config.rafflePhatContractAddress);
    console.log('subQL url: %s', config.subqlUrl);
}

