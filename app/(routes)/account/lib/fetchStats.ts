import { Idl, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { encode } from "@coral-xyz/anchor/dist/cjs/utils/bytes/utf8";

const fetchStats = async ( program: Program<Idl>, address?: PublicKey ) => {
    
    let account = program.provider.publicKey;
    let res;

    if (address) {
        account = address
    }

    const [PDA, _bump] = PublicKey.findProgramAddressSync([
        encode("user_stats"),
        account.toBuffer(),
        ], 
        program.programId
    );

    try {
        res = await program.account.userStats.fetch(PDA);
        console.log(res);
    } catch(e) {
        console.log(e)
    }
    
    return res;
}
 
export default fetchStats;