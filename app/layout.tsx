import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "Cement Canvas - Artisan Marketplace",
  description: "Showcase and sell your cement decorative pieces with social reach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
