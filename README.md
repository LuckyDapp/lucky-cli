# Tools for 'Lucky'

Phat Contracts need to be scheduled to 

This project: 
- call the dAppStaking pallet to claim the dApp rewards
- call the phat contract to start the raffle


## Environment

- [Typescript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/en/).
- [Npx](https://www.npmjs.com/package/npx/).

## Install 

Last, under the project directory, run following command to install all the dependency.

```
npm install
```

## Run

Last, under the project directory, run following command to install all the dependency.

```
npx ts-node src/luckyCli.ts [Options]
```

```
Options:
    --help                          Show help
    --dc, --displayConfiguration    Display the configuration
    --di, --displayInformation      Display information from indexer and smart contracts
    --ch, --checks                  Check if the grants and the configuration in the smart contracts have been set
    --cl, --claim                   Claim dappStaking developer rewards
     -r, --raffle                   Start the raffle
    --version                       Show version number                       
```

If you want to check the configuration.

```
npx ts-node src/luckyCli.ts --network <network> --checks 
```

If you want to claim the rewards from dapp staking for all missing era.

```
npx ts-node src/luckyCli.ts --network <network> --claim 
```

If you want to run the raffle for all missing era.

```
npx ts-node src/luckyCli.ts --network <network> --raffle 
```

