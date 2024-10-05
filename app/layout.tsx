"use client";

import "./globals.css";
import { SelectedCarProvider } from "./context/SelectedCar";
import { AddCarModalProvider } from "./context/AddCarModalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SelectedCarProvider>
          <AddCarModalProvider>{children}</AddCarModalProvider>
        </SelectedCarProvider>
      </body>
    </html>
  );
}
