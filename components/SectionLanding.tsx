import clsx from "clsx";
import Link from "next/link";
import * as React from "react";

import MyImage from "./common/MyImage";

export default function SectionLanding({
  title,
  description,
  imageSrc,
  imageAlt,
  textBoxColor,
  ctaText,
  ctaLink,
}: {
  title: string;
  description: string[];
  imageSrc: string;
  imageAlt: string;
  textBoxColor: "cyan" | "lime";
  ctaText: string;
  ctaLink: string;
}) {
  return (
    <div
      className={
        "w-screen h-[667px] relative flex justify-center items-center lg:h-[900px]"
      }
    >
      <MyImage
        src={imageSrc}
        alt={imageAlt}
        className="object-cover object-center absolute"
        loading="lazy"
        fill
      />
      <div
        className={clsx(
          "absolute bottom-5 text-white w-[300px] py-4 rounded-2xl text-lg font-light gap-2 flex flex-col items-center text-center 2xl:bottom-12 2xl:text-2xl 2xl:gap-4 2xl:w-[400px] 2xl:py-8",
          textBoxColor === "cyan" && "bg-cyan-700/60",
          textBoxColor === "lime" && "bg-lime-950/60"
        )}
      >
        <span className="text-2xl font-semibold 2xl:text-4xl">{title}</span>
        {description.map((desc, index) => (
          <p key={index}>{desc}</p>
        ))}
        <Link
          href={ctaLink}
          className="bg-transparent border border-white text-white font-semibold py-2 px-4 rounded-lg  2xl:text-xl"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
