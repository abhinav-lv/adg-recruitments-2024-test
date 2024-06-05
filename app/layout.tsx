import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ADG Recruitments '24",
  description: "Recruitments Portal for ADG's 2024 recruits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "black" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
