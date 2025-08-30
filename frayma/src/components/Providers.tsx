"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"   // 👈 start in light mode
      enableSystem={false}   // 👈 ignore OS dark mode
    >
      {children}
    </ThemeProvider>
  );
}
