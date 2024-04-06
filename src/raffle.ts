import {rafflePhatContract} from './phatContractHelper';
import {Keyring} from "@polkadot/api";
import {signCertificate} from "@phala/sdk";


export async function callRafflePhatContract() : Promise<void>{

    const alice = new Keyring({ type: 'sr25519' }).addFromUri("//Alice")
    const aliceCertificate = await signCertificate({ pair: alice })

    const {result, output} = await rafflePhatContract.query['runRaffle'](alice.address, {cert: aliceCertificate});

    if (result.isOk){
        const value : string = output?.toString() ?? '';
        const tx = JSON.parse(value).ok;
        console.log('Tx for the raffle: %s', tx);
        return;
    }
    return Promise.reject("ERROR when start the raffle " + result.asErr);
}
