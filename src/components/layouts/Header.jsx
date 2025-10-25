// import React, { useState } from "react";
// import { Menubar } from "primereact/menubar";
// import { Button } from "primereact/button";
// import { useNavigate } from "react-router-dom";
// import { Dropdown } from "primereact/dropdown";
// import Logo from "../../assets/Umugenzi-Logo.png";
// import "../../styles/header.css";

// export default function Header() {
//   const navigate = useNavigate();
//   const [selectedLang, setSelectedLang] = useState("FR");

//   const langs = [
//     { label: "Français", value: "FR" },
//     { label: "English", value: "EN" },
//   ];

//   const items = [
//     { label: "Accueil", command: () => navigate("/") },
//     { label: "Événements", command: () => navigate("/events") },
//     { label: "À propos", command: () => navigate("/about") },
//     { label: "Contact", command: () => navigate("/contact") },
//   ];

//   const start = (
//     <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
//       <img src={Logo} alt="logo" className="logo" />
//       {/* <span className="text-xl font-bold text-blue-600 hidden md:block">Umugenzi</span> */}
//     </div>
//   );

//   const end = (
//     <div className="flex items-center space-x-3">
//       {/* Dropdown langue */}
//       <Dropdown
//         value={selectedLang}
//         options={langs}
//         onChange={(e) => setSelectedLang(e.value)}
//         className=""
//       />

//       {/* Bouton login */}
//       <Button
//         label="Login"
//         className="p-button-text text-gray-700 hover:text-blue-600"
//       />
//     </div>
//   );

//   return (
//     <div className="fixed top-0 left-0 z-50" style={{ width: "calc(100% - 0.95rem)" }}>
//       <Menubar
//         model={items}
//         start={start}
//         end={end}
//         className="border-none rounded-none px-4"
//         style={{
//           display: "flex",
//           justifyContent: "space-between", // <-- force items à se répartir
//           alignItems: "center",
//           height: "64px",
//         }}
//       />
//     </div>
//   );
// }

import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Umugenzi-Logo.png";
import "../../styles/header.css"; // on va y mettre un peu de style

export default function Header() {
  const navigate = useNavigate();
  // const [selectedLang, setSelectedLang] = useState("FR");

  // const langs = [
  //   { label: "Français", value: "FR" },
  //   { label: "English", value: "EN" },
  // ];

  const items = [
    { label: "Accueil", icon: "pi pi-home", command: () => navigate("/") },
    { label: "Événements", icon: "pi pi-calendar", command: () => navigate("/events") },
    { label: "À propos", icon: "pi pi-info-circle", command: () => navigate("/about") },
    { label: "Contact", icon: "pi pi-envelope", command: () => navigate("/contact") },
  ];

  const start = (
    <div className="header-logo" onClick={() => navigate("/")}>
      <img src={Logo} alt="Umugenzi Logo" />
    </div>
  );

  const end = (
    <div className="header-right">
      {/* <Dropdown
        value={selectedLang}
        options={langs}
        onChange={(e) => setSelectedLang(e.value)}
        placeholder="Langue"
        className="p-inputtext-sm lang-dropdown"
      /> */}

      <Button
        label="Login"
        icon="pi pi-user"
        className="p-button-info p-button-sm button-rounded"
        onClick={() => navigate("/login")}
      />
    </div>
  );

  return (
    <div className="header-container">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
