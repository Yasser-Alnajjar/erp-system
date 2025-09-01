import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | Falcon Focus`,
    default: "Falcon Focus",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
