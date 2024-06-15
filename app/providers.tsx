// app/providers.tsx
"use client";
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      btnBg: "#3f03a6",
      btnBgHover: "#5302de",
      btnBg2: "#e0e0e0",
      btnBgHover2: "#c9c9c9",
      blackAlpha: "rgba(0,0,0,0.5)",
      menuBg: "rgba(25,25,25,0.8)",
      menuTxt: "#bfaffa",
      violet: "#5618db",
      darkViolet: "#2a026e",
      gray: "#dedede",
      // ...
      900: "#1a202c",
    },
  },
  fonts: {
    heading: "var(--font-rubik)",
  },
});

import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </AuthContextProvider>
  );
}
