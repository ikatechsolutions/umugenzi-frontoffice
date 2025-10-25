import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./organisateur_app/AppHeader";
import AppSidebar from "./organisateur_app/AppSidebar";

const AppLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="app-layout">
      <AppHeader onMenuClick={() => setSidebarVisible(true)} />
      <AppSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
      <main className="app-content">
        <Outlet />
      </main>
    </div>

  );
};

export default AppLayout;
