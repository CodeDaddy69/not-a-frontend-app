import './styles/globals.css';
import './styles/wallet.css';
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
        <div className="space-y-10">
          <WalletContextProvider>
            <div className="flex py-2 bg-amber-100 items-center">
              <div className='w-1/3 inline-block px-4'><WalletButton className='wallet-button'/></div>
              <div className='flex w-1/3 items-center justify-around'>
                <Link className="flex hover:scale-110 active:scale-100 font-semibold" href="/">home</Link>
                <Link className="flex hover:scale-110 active:scale-100 font-semibold" href="/browse">browse</Link>
                <Link className="flex hover:scale-110 active:scale-100 font-semibold" href="/account">account</Link>
              </div>
            </div>
            {children}
          </WalletContextProvider>
        </div>
      </body>
    </html>
  )
}