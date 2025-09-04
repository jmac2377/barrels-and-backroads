// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Barrels & Backroads",
  description: "Scenic road trips and great whiskey stops.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
