import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

/** Layout pour les pages publics */

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full main_content">
      <Header /> {/* navbar */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
