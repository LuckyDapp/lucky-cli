# Schedulers used by the dApp 'Lucky'

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
    --help                          Show help                        [boolean]
    --ce, --currentEra              Display the current era for dApp staking
    --lrr, --lastEraReceivedReward  Display the last era when the dapp
                                    received rewards from dApp staking
    --lrd, --lastEraRaffleDone      Display the last era when the raffle has
                                    been run
    --dc, --displayConfiguration    Diplay the configuration (contract and
                                    http addresses)
    --ch, --checks                  Check if the grants and the configuration
                                    in the smart contracts have been set
    --cl, --claim                   Claim dappStaking developer rewards for a
                                    given era - era is mandatory
    --ri, --readIndex               Read data from the indexer for a given era
                                    - era is mandatory
    --so, --setOracle               Set Oracle data for a given era - era is
                                    mandatory
    --co, --clearOracle             Clear Oracle data for a given era - era is
                                    mandatory
    -r, --raffle                    Start the raffle for a given era - era is
                                    mandatory
    -a, --all                       Equivalent to --checks --claim --setOracle
                                    --raffle for a given era or for for all
                                      era (from --lastEra to --currentEra) if no
                                      era is provided
    --era                           Given era                         [number]
    -d, --debug                         Debug mode: display more information
    --version                       Show version number                       
```

If you want to claim the rewards from dapp staking, read the data (partcipant + rewards) from the indexer, set the data in the oracle and start the raffle for a given era you can:

```
npx ts-node src/luckyCli.ts --all --era <era>
```

If you want to do it for all remaning eras you can:

```
npx ts-node src/luckyCli.ts --all
```