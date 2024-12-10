'use client';

import React from "react";
import "./globals.css";

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="dark">
      <head>
        <title>OnPoint</title>
        <link rel="icon" type="image/x-icon" href="/onpoint.png" />
      </head>
      <body className="dark text-foreground bg-background">

          <main className="p-20">{children}</main>
      </body>
    </html>
  );
}
