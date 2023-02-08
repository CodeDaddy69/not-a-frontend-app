'use client'
import { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React, { FC, useCallback } from 'react';
import { sign } from 'tweetnacl';



export default function Home() {

  const { publicKey, signMessage } = useWallet();

  const onClick = async () => {
      try {
          // `publicKey` will be null if the wallet isn't connected
          if (!publicKey) throw new Error('Wallet not connected!');
          // `signMessage` will be undefined if the wallet doesn't support it
          if (!signMessage) throw new Error('Wallet does not support message signing!');

          // Encode anything as bytes
          const message = new TextEncoder().encode('Hello, world!');
          // Sign the bytes using the wallet
          const signature = await signMessage(message);

          console.log(signature);

          const pak = {
            "Signature" : bs58.encode(signature),
            "PubKey" : publicKey,
            "message" : "Hello, world!"
          }
          
          const getAuth = async () => {
            const res2 = await fetch('http://127.0.0.1:5000/setCookie', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(pak),
            });
            return await res2.json;
          }

          const resp = await getAuth();
          console.log(resp);

          alert(`Message signature: ${bs58.encode(signature)}`);
      } catch (error: any) {
          alert(`Signing failed: ${error?.message}`);
      }
  }

  return(
    <div>
      <button onClick = {onClick}>Sign</button>
    </div>
  )
}
