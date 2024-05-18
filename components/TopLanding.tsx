import * as React from "react";

import MyImage from "./common/MyImage";

export default function TopLanding() {
  return (
    <div className="w-full h-[667px] relative overflow-hidden flex flex-col justify-center items-center color-white text-center lg:h-[900px]">
      <MyImage
        src="/九份/50185219987_dd610f128f_o_xEr4kVwGoaE.jpeg"
        alt=""
        className="w-full h-full object-cover object-center"
        fill
        loading="eager"
        priority
      />
      <div className={"z-10 text-white text-center absolute bottom-12 flex flex-col gap-4"}>
        <span className={"text-3xl font-bold md:text-4xl"}>Vicharm 攝影旅行日誌</span>
        <p className={"text-xl md:text-2xl"}>在旅行途中，成就更美好的意義</p>
      </div>
    </div>
  );
}
