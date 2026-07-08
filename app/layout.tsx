import type { Metadata } from "next";
import { Newsreader, DM_Sans, Caveat } from "next/font/google";

import { cn } from "@/lib/utils";
import "@/app/globals.css";

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-newsreader",
});
const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});
const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Đặng Diễm Quỳnh — May thủ công & Hội hoạ",
  description:
    "Mình là Quỳnh — may thủ công và hội hoạ tại TP. Hồ Chí Minh. Nhận may theo số đo, làm quà thủ công, mỗi món một câu chuyện.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={cn(
        "antialiased",
        newsreader.variable,
        dmSans.variable,
        caveat.variable
      )}
    >
      <body>{children}</body>
    </html>
  );
}
