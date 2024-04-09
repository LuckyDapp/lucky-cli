interface Seed {
    readonly seed: string;
}

class ShibuyaConfig implements Seed {
    seed = 'your mnemonic phrase';
}

class ShidenConfig implements Seed {
    seed = 'your mnemonic phrase';
}

class AstarConfig implements Seed {
    seed = 'your mnemonic phrase';
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
