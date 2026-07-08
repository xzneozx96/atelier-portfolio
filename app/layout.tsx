import type { Metadata } from "next";
import { Newsreader, Be_Vietnam_Pro, Mansalva } from "next/font/google";

import { cn } from "@/lib/utils";
import "@/app/globals.css";

const newsreader = Newsreader({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-newsreader",
});
const dmSans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});
const caveat = Mansalva({
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
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
