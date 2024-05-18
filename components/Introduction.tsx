import * as React from "react";

import MyImage from "./common/MyImage";

export default function Introduction() {
  return (
    <div className="flex justify-center items-center flex-wrap pt-10 pb-5 px-4 gap-10 md:my-28">
      <div className="relative w-[270px] h-[180px] md:w-[330px] md:h-[220px] 2xl:w-[600px] 2xl:h-[400px]">
        <div className="absolute bg-gray-300 bottom-5 right-5 w-full h-full 2xl:bottom-10 2xl:right-10"></div>
        <MyImage
          src="/kenting/47536553071_25cbcccaa4_o_0z1ZTr_yh.jpeg"
          alt="Vicharm"
          fill
          priority
        />
      </div>
      <div className="flex flex-col gap-2 2xl:text-2xl 2xl:gap-8">
        <div className="text-slate-900 text-2xl font-semibold 2xl:text-5xl">
          <span>Vicharm photography</span>
        </div>
        <div>
          <p>Hello 我是 Vicharm</p>
          <p>目前是WFH軟體工程師/旅行風景攝影愛好者，</p>
          <p>旅行過台灣許多鄉鎮，看過許多台灣的美，</p>
          <p>會在這裡分享旅行中所看到的風景, 故事與攻略</p>
        </div>
      </div>
    </div>
  );
}
