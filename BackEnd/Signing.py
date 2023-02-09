from nacl.signing import VerifyKey
from solana.publickey import PublicKey
import sys

# Kill me now 
sys.path.insert(0,'/home/adam/.local/lib/python3.10/site-packages/base58')

import base58

def veryify_me(publickey, message, signature):

    pubkey = bytes(PublicKey(publickey))
    msg = bytes(message, 'utf8')
    signed = bytes(signature, 'utf8')

    result = VerifyKey(
        pubkey
    ).verify(
        smessage=msg,  
        signature=base58.b58decode(signed)
    )

    print(result.decode())
    print(message)

    if result.decode() == message:
        return True
    else:
        return False