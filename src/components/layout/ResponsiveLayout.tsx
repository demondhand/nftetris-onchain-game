"use client";

import { useDevice } from "@/hooks/useDevice";
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";

export default function ResponsiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobile } = useDevice();

  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}
