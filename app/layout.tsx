import '../styles/globals.scss'

import Script from "next/script"
import React from "react";

import Header from '../components/Header';
import { IGIcon } from "../components/IGIcon";

const GA = () => {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `}
      </Script>
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="zh-Hant">
      <body>
        <>
          <GA />
          <div className="">
            <Header />
            {children}
            <footer className="w-full h-10 flex justify-around items-center py-4">
              <p className="text-sm">© 2023 Vicharm. All rights reserved</p>
              <IGIcon />
            </footer>
          </div>
        </>
      </body>
    </html>
  )
}