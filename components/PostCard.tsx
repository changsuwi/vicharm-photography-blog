import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

import { PostCardView } from "../models/post";
import MyImage from "./common/MyImage";

export default function PostCard({
  data,
  category,
  supportVerticalUI,
}: {
  data: PostCardView;
  category: "trip" | "article";
  supportVerticalUI?: boolean;
}) {
  const { title, img, preview, id } = data;
  return (
    <Link href={`/${category}/${id}`} key={id} className={clsx("w-[300px]", supportVerticalUI && "md:w-full")}>
      <div
        className={clsx(
          "flex flex-col bg-white text-center rounded-2xl",
          supportVerticalUI && "md:flex-row md:gap-4 "
        )}
      >
        <div
          className={clsx(
            "w-[300px] h-[375px] relative flex flex-shrink-0",
            supportVerticalUI &&
              "md:w-[320px] md:h-[230px] lg:w-[480px] lg:h-[270px] 2xl:w-[640px] 2xl:h-[360px]"
          )}
        >
          <MyImage
            src={img}
            alt={title}
            loading="lazy"
            fill
            className={clsx(
              "object-cover object-center rounded-t-2xl transition-opacity",
              supportVerticalUI && "md:rounded-2xl"
            )}
            sizes="(min-width: 320px) 300px, (min-width: 768px) 320px, (min-width: 768px) 480px, (min-width: 1440px) 640px"
          />
          <div className="opacity-0 absolute w-full h-full transition-opacity bg-gradient-to-r from-black/30 via-gray-900/30 to-black/30 rounded-t-2xl hover:opacity-100 flex justify-center items-center">
            <FontAwesomeIcon
              icon={faArrowRight}
              width="24px"
              height="24px"
              color="#f8f8f7"
            />
          </div>
        </div>
        <div className="px-4 py-2 text-left">
          <h2
            className={clsx(
              "line-clamp-2 text-ellipsis text-xl font-semibold h-14",
              supportVerticalUI && "text-2xl 2xl:text-3xl 2xl:h-[72px] 2xl:mb-7"
            )}
          >
            {title}
          </h2>
          <div
            className={clsx(
              "line-clamp-2 text-ellipsis",
              supportVerticalUI && "text-xl 2xl:text-2xl"
            )}
          >
            {preview}
          </div>
        </div>
      </div>
    </Link>
  );
}
