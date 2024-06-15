// app/fonts.ts
import { Rubik, Kumbh_Sans } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  variable: "--font-kumbh",
});

export const fonts = {
  rubik,
  kumbh,
};
