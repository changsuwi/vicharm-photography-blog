import { useEffect } from "react";

import Amplitude from "../lib/Amplitude";

export default function useScrollTrack(pageName: string) {
  let maxScroll = 0;

  const scrollHandler = (e: Event) => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > maxScroll) maxScroll = currentScrollY;
  };

  useEffect(() => {
    Amplitude.init();
    Amplitude.analyticsPageView(`/${pageName}`);

    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);

      Amplitude.leavePageEvent(document, pageName, maxScroll, pageName);
    };
  }, []);
}