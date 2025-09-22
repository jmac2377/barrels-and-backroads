// app/layout.jsx
import "../styles/globals.css";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Header from "../components/Header";

export const metadata = {
  title: "Barrels & Backroads",
  description: "Roads, Whiskey, and Wide Open Skies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<body>
  <Nav />
  <Header />  {/* PATCH D: header text bar */}
  {children}
  <Footer />
</body>
    </html>
  );
}
