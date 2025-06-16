import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import StoreProvider from "./StoreProvider";
import AppWrapper from "./AppWrapper";

export const metadata: Metadata = {
  title: "CarNation",
  description: "Buy and sell cars online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
          <StoreProvider>
            <AppWrapper>
              {children}
            </AppWrapper>
          </StoreProvider>
        <Footer />
      </body>
    </html>
  );
}
