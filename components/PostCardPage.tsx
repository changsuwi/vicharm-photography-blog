import * as React from "react";

import MyImage from "./MyImage";

export default function PostCardListPage({ children, landingImgSrc, category }: { children: React.ReactNode, landingImgSrc: string, category: "trip" | "article" }) {
  return (
    <>
      <div className="w-full h-[300px] relative md:h-[500px] lg:h-[600px]">
        <MyImage
          src={landingImgSrc}
          alt=""
          className={"w-full h-full object-cover object-center"}
          fill
          loading="eager"
          priority
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full max-w-7xl items-center justify-center gap-4 px-4 py-12 md:gap-8 2xl:gap-16">
          {children}
        </div>
      </div>
    </>
  );
};