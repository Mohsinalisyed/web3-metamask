"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { type State, WagmiProvider } from 'wagmi'
import { config } from "./config";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  initialState: State | undefined,
}

export function Providers({ children, themeProps,initialState }: ProvidersProps) {
  const router = useRouter();

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </WagmiProvider>
  );
}
