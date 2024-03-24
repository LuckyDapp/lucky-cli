interface Seed {
    readonly seed: string;
}

class ShibuyaConfig implements Seed {
    seed = 'measure acid custom dash market rebuild cup spread stairs kit trust intact';
}

class ShidenConfig implements Seed {
    seed = 'oil episode increase pair hungry slice long rug solid neutral album camera';
}

class AstarConfig implements Seed {
    seed = 'this good fatal size raccoon crisp focus scrap lumber green element hello';
}

export let seed : Seed;

export function initSeedConfig(network: string) {
    if (network == 'shibuya'){
        seed = new ShibuyaConfig();
    } else if (network == 'shiden'){
        seed = new ShidenConfig();
    } else if (network == 'astar'){
        seed = new AstarConfig();
    } else {
        throw new Error("No config for this Network");
    }
}
