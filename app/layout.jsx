// app/layout.jsx
import "../styles/globals.css";
import Script from "next/script";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Header from "../components/Header";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Barrels & Backroads",
  description: "Roads, Whiskey, and Wide Open Skies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <Header /> {/* PATCH D: header text bar */}
        {children}
        <Footer />
        <Analytics />

        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-3F3598PZR6"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-3F3598PZR6');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}