import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | erp system`,
    default: "erp system",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
