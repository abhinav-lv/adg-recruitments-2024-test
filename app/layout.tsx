import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { fonts } from "./fonts";

export const metadata: Metadata = {
  title: "ADG Domain Selections '24",
  description: "Domain Selections Portal for ADG's 2024 recruits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body
        style={{
          backgroundColor: "black",
          backgroundImage: "url(/background.png)",
          backgroundSize: "cover",
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
