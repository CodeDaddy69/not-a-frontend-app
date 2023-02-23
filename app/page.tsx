'use client'
import { useState, useEffect } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React, { FC, useCallback } from 'react';
import Popup from "./components/popup";
import './styles/popup.css';
import { setCookie, getCookie, getCookies, hasCookie, deleteCookie } from 'cookies-next';

export default function Home() {

  const { publicKey, signMessage } = useWallet();

  const [isOpen, setIsOpen] = useState(false);
  const [doOnce, setDoOnce] = useState(true);
  const [sessionCookie, setHasCookie] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const phantomAuth = async () => {

    try {

      const getMsg = async () => {
        const res2 = await fetch('http://127.0.0.1:5000/getAuthMsg/'+publicKey, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        });
        return res2.json();
      }

      const uidMsg = await getMsg();

      // Encode anything as bytes
      const message = new TextEncoder().encode(uidMsg['authMsg']);
      // Sign the bytes using the wallet
      const signature = await signMessage(message);

      const pak = {
        "Signature" : signature,
        "PubKey" : publicKey,
        "message" : uidMsg['authMsg']
      }
    
      const getAuth = async () => {
        const res2 = await fetch('http://127.0.0.1:5000/setCookie', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(pak),
        });
        return res2.json();
      }

      const resp = await getAuth();
      console.log(resp);

          alert(`Message signature: ${bs58.encode(signature)}`);
      } catch (error: any) {
          alert(`Signing failed: ${error?.message}`);
      }
    }

  if (publicKey && doOnce && !sessionCookie){
    togglePopup();
    setDoOnce(false);
    setHasCookie(true);

  }

  return(
    <div>
      {isOpen && <Popup
      content={
      <>
        <button onClick={phantomAuth}>AUTHENTICATE ME</button>
      </>
      }
      handleClose={togglePopup}
    />}
    </div>
  )
}
