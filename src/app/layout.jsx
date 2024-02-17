import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Providers } from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pet Sitter | Perfect | For Your Pet",
  description: "You Pets,Our Priority:Perfect Care,Anytime,Anywhere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
