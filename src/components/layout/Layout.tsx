import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NewsletterBanner from "./NewsletterBanner";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <NewsletterBanner />
      <Footer />
    </div>
  );
};

export default Layout;
