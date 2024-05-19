import '../styles/globals.scss'

import React from "react";

import GA from "../components/common/GA";
import { IGIcon } from "../components/common/IGIcon";
import Header from './header';

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