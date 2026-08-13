import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const socialImage = `${protocol}://${host}/og.png`;
  return {
    title: "คณิตศาสตร์ 12* (ค 33206) | ชุดที่ 12",
    description: "โจทย์ A-Level คณิตศาสตร์ 30 ข้อ พร้อมเฉลย กระดาษทด และ PDF รวม 30 หน้า A4",
    icons: { icon: "/logo-base.png", shortcut: "/logo-base.png" },
    openGraph: { title: "คณิตศาสตร์ 12* (ค 33206) | ชุดที่ 12", description: "โจทย์ 30 ข้อ เฉลยละเอียด กระดาษทด และ PDF รวม 30 หน้า A4", images: [socialImage], type: "website" },
    twitter: { card: "summary_large_image", title: "คณิตศาสตร์ 12* (ค 33206) | ชุดที่ 12", description: "โจทย์ 30 ข้อ เฉลยละเอียด กระดาษทด และ PDF รวม 30 หน้า A4", images: [socialImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}
