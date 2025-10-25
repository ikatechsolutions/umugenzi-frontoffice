import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const AppSidebar = ({ visible, onHide }) => {
  const navigate = useNavigate();

  return (
    <Sidebar visible={visible} onHide={onHide} showCloseIcon={false}>
      <div className="flex flex-column gap-3">
        <h3 className="mb-3 text-primary">Menu</h3>

        <Button
          label="Dashboard"
          icon="pi pi-home"
          className="p-button-text justify-content-start"
          onClick={() => navigate("/dashboard")}
        />
        <Button
          label="Mes événements"
          icon="pi pi-calendar"
          className="p-button-text justify-content-start"
          onClick={() => navigate("/events")}
        />
        <Button
          label="Créer un événement"
          icon="pi pi-plus-circle"
          className="p-button-text justify-content-start"
          onClick={() => navigate("/events/create")}
        />
        <Button
          label="Tickets"
          icon="pi pi-ticket"
          className="p-button-text justify-content-start"
          onClick={() => navigate("/tickets")}
        />
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
