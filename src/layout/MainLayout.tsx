import React from "react";
import Navbar from "../components/navigations/header/Navbar";
import Footer from "../components/navigations/footer/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="flex flex-col min-h-screen  text-white">
      <Navbar />

      <div className="flex-1 pt-20 8">{children}</div>

      <Footer />
    </main>
  );
};

export default MainLayout;
