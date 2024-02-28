"use client";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@/hooks/hooks";
import { CookiesProvider } from "next-cookies";
export function Providers({ children }) {
  return (
    <UserProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </UserProvider>
  );
}
