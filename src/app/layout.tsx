"use client";

import { Provider } from "react-redux";
import { store } from "./Reduxxx/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}

// 32:48 end

// git init
// git add README.md
// git commit -m "firebase practice"
// git branch -M main
// git remote add origin https://github.com/syedtechnicl/fp.git
// git push -u origin main
