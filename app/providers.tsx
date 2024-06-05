// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </AuthContextProvider>
  );
}
