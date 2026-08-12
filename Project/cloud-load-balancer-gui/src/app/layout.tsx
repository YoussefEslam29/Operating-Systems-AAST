import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloud Load Balancer — Interactive Simulation",
  description:
    "Real-time visualization of CPU scheduling, Round Robin load balancing, multithreading, and IP geolocation routing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
