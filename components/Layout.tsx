import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import GA from "./common/GA";
import { IGIcon } from "./common/IGIcon";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > window.screen.height * 0.08 && !sticky) {
      setSticky(true);
    } else if (window.pageYOffset === 0 && sticky) {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <GA />
      <div className="">
        <header
          className={twMerge(
            clsx(
              "z-20 bg-transparent fixed top-0 mt-6 text-white flex justify-around items-center w-full h-[42px] transition-colors md:h-[46px] 2xl:h-[54px]",
              sticky && "bg-white shadow-lg mt-0 text-slate-900"
            )
          )}
        >
          <Link href="/" aria-label="Home">
            <Image
              src={sticky ? "/logo/logo.png" : "/logo/logo2.png"}
              alt="logo"
              width={42}
              height={42}
              className=""
            />
          </Link>

          <div className="flex gap-10">
            <Link href="/trip">旅程指南</Link>

            <Link href="/article" className="">
              旅行紀錄
            </Link>

            <Link href="/article" className="hidden">
              攝影紀錄
            </Link>

            <Link href="/article" className="hidden">
              景點列表
            </Link>
          </div>
          <IGIcon />
        </header>
        {children}
        <footer className="w-full h-10 flex justify-around items-center py-4">
          <p className="text-sm">© 2023 Vicharm. All rights reserved</p>
          <IGIcon />
        </footer>
      </div>
    </>
  );
}
