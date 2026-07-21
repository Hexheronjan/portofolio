"use client";

import { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  // Use native smooth scroll for better performance across all devices
  // Lenis disabled to prevent janky behavior in production
  return <>{children}</>;
}
