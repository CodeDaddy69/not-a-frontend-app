from nacl.signing import VerifyKey
import sys

# Kill me now 
sys.path.insert(0,'/home/adam/.local/lib/python3.10/site-packages/base58')

import base58

def veryify_me(publickey, message, signature):

    pubkey = base58.b58decode(publickey)
    msg = bytes(message, 'utf8')
    signed = bytes(signature["data"])
    
    result = VerifyKey(
        pubkey
    ).verify(
        smessage=msg,  
        signature=signed
    )

    print(result.decode())
    print(message)

    if result.decode() == message:
        return True
    else:
        return False