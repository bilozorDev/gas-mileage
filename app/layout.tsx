"use client";

import "./globals.css";
import { SelectedCarProvider } from "./context/SelectedCar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SelectedCarProvider>{children}</SelectedCarProvider>
      </body>
    </html>
  );
}
