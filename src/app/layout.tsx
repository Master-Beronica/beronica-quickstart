import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "베로니카 시작하기 | Beronica Quickstart",
  description:
    "Obsidian + AI로 만드는 나만의 업무 비서, 5분 만에 세팅하세요.",
  openGraph: {
    title: "베로니카 시작하기 | Beronica Quickstart",
    description:
      "Obsidian + AI로 만드는 나만의 업무 비서, 5분 만에 세팅하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className={`${inter.className} antialiased bg-[#050505]`}>
        {children}
      </body>
    </html>
  );
}
