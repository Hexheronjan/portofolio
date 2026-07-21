"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsMobile(checkMobile());

    // Add lenis-smooth class to html when Lenis is active
    if (!checkMobile()) {
      document.documentElement.classList.add("lenis-smooth");
    }

    return () => {
      document.documentElement.classList.remove("lenis-smooth");
    };
  }, []);

  // Di mobile: pakai native scroll (jauh lebih smooth & hardware-accelerated)
  // Di desktop: pakai Lenis untuk smooth wheel scroll
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
