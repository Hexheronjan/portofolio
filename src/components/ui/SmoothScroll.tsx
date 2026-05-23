"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsMobile(checkMobile());
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
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
