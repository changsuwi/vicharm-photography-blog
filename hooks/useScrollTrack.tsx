import { useEffect } from "react";

import Amplitude from "../lib/Amplitude";

export type ScrollTrackType = "trip-list" | "article-list" | "article" | "trip" | "home";

export default function useScrollTrack(id: string, type: ScrollTrackType) {
  let maxScroll = 0;

  const scrollHandler = (e: Event) => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > maxScroll) maxScroll = currentScrollY;
  };

  useEffect(() => {
    Amplitude.init();
    Amplitude.analyticsPageView(`/${type}`);

    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);

      Amplitude.leavePageEvent(document, id, maxScroll, type);
    };
  }, []);
}