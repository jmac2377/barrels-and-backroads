// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Barrels & Backroads — Whiskey. Roads. Adventure.",
  description: "Curated scenic drives to memorable tasting rooms and cozy places to land for the night.",
  openGraph: {
    title: "Barrels & Backroads",
    description: "Whiskey. Roads. Adventure.",
    url: "https://barrelsandbackroads.com",
    siteName: "Barrels & Backroads",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Barrels & Backroads" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barrels & Backroads",
    description: "Whiskey. Roads. Adventure.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
