import './styles/globals.css';
import './styles/wallet.css';
import buttons from './styles/buttons.module.css';
import React from 'react';
import WalletContextProvider from './components/walletproviders';
import WalletButton from './components/walletbutton';
import Link from 'next/link';

import { Albert_Sans } from '@next/font/google';

const albertSans = Albert_Sans({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={albertSans.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div>
          <WalletContextProvider>
            <ul>
              <li className='inline-block p-4'><WalletButton className='wallet-button'/></li>
              <li className='inline-block p-4'><Link className={buttons.button} href="/">home</Link></li>
              <li className='inline-block p-4'><Link className={buttons.button} href="/browse">browse</Link></li>
              <li className='inline-block p-4'><Link className={buttons.button} href="/account">account</Link></li>
            </ul>
            {children}
          </WalletContextProvider>
        </div>
      </body>
    </html>
  )
}