import {alice, aliceCertificate, rafflePhatContract} from './phatContractHelper';


export async function callRafflePhatContract() : Promise<void>{

    console.log('Run raffle for era');

    const {result, output} = await rafflePhatContract.query['runRaffle'](alice.address, {cert: aliceCertificate});

    if (result.isOk){
        const value : string = output?.toString() ?? '';
        const tx = JSON.parse(value).ok;
        console.log('Tx for the raffle: %s', tx);
        return;
    }
    return Promise.reject("ERROR when start the raffle " + result.asErr);
}
