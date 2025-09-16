import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";

export const metadata: Metadata = {
  title: "CV Maker",
  description: "AI powered CV making application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
