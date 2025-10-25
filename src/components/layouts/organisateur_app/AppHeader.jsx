import React from "react";
import { Button } from "primereact/button";
import Logo from "../../../assets/Umugenzi-Logo.png";
import { useAuth } from "../../../hooks/useAuth";

const AppHeader = ({ onMenuClick }) => {
  const { user, handleLogout } = useAuth();

  return (
    <header className="flex align-items-center justify-content-between px-4 py-3 shadow-2 bg-white">
      {/* Bouton menu (mobile) */}
      <Button
        icon="pi pi-bars"
        className="p-button-text p-button-rounded"
        onClick={onMenuClick}
      />

      {/* Logo */}
      <div className="flex align-items-center gap-2">
        <img src={Logo} alt="Umugenzi Logo" style={{ width: "40px", height: "40px" }} />
        <h3 className="m-0 text-primary">Umugenzi</h3>
      </div>

      {/* Utilisateur */}
      <div className="flex align-items-center gap-3">
        <span className="font-medium">{user?.data?.name}</span>
        <Button
          icon="pi pi-sign-out"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={handleLogout}
          tooltip="Se déconnecter"
        />
      </div>
    </header>
  );
};

export default AppHeader;
