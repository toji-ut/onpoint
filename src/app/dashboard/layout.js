'use client';

import React from "react";
import "../globals.css";
import LayoutItems from "../../../components/LayoutComp"

export default function RootLayout({ children }) {
  const handleSearch = (query) => {
    console.log(`Searching for: ${query}`); // needs replacement, here for the time beinh
  };
  return (
    <html lang="en" className="dark">
      <head>
        <title>OnPoint</title>
        <link rel="icon" type="image/x-icon" href="/onpoint.png" />
      </head>
      <body className="dark text-foreground bg-background">
      <div className="w-full">
        <LayoutItems />
      </div>
          <main className="main">{children}</main>
      </body>
    </html>
  );
}

