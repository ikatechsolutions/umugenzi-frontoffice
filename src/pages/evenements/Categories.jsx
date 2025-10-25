import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import "../../styles/Categories.css";

import TicketsImg from "../../assets/tickets.jpg";
import UmugenziImg from "../../assets/game.jpg"; 

export default function Categories() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const categories = [
    {
      title: "Achat de Tickets",
      text: "Réservez vos billets pour concerts, sports et événements en quelques clics.",
      image: TicketsImg,
      buttons: [
        {
          label: "Explorez les événements",
          severity: "help",
          outlined: true,
          action: () => navigate("/events"),
        },
        {
          label: "Créer un événement",
          severity: "secondary",
          outlined: false,
          action: () => setShowPopup(true),
        },
      ],
    },
    {
      title: "Jeu Umugenzi",
      text: "Rejoignez l’aventure et testez vos connaissances dans un univers interactif et amusant.",
      image: UmugenziImg,
      buttons: [
        {
          label: "Voir plus",
          severity: "help",
          outlined: false,
          action: () => navigate("/umugenzi"),
        },
      ],
    },
  ];

  const handleLogin = () => {
    setShowPopup(false);
    navigate("/login");
  };

  const handleRegister = () => {
    setShowPopup(false);
    navigate("/signup");
  };

  return (
    <section style={{ padding: "2.5rem", backgroundColor: "#f3f4f6" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
        }}
      >
        Explorez nos{" "}
        <span style={{ color: "#9333ea" }}>services</span>
      </h2>

      {/* Grille avec 2 cartes équilibrées */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            style={{
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)";
            }}
          >
            <Card
              title={cat.title}
              subTitle={cat.text}
              className="shadow-2 border-round-xl"
              header={
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    overflow: "hidden",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
              }
              footer={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginTop: "auto",
                  }}
                >
                  {cat.buttons.map((btn, i) => (
                    <Button
                      key={i}
                      label={btn.label}
                      severity={btn.severity}
                      outlined={btn.outlined}
                      onClick={btn.action}
                      className="w-full category-button"
                    />
                  ))}
                </div>
              }
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%", // occupe tout
                minHeight: "420px", // même hauteur pour toutes les cartes
              }}
            ></Card>
          </div>
        ))}
      </div>

      {/* Popup création d’événement */}
      <Dialog
        header="Créer un événement"
        visible={showPopup}
        style={{ width: "40rem", borderRadius: "10px" }}
        onHide={() => setShowPopup(false)}
        blockScroll
      >
        <div style={{ padding: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "1.2rem" }}>
            Pour créer un événement sur notre plateforme, vous devez disposer
            d’un compte organisateur.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Button
              label="Se connecter"
              icon="pi pi-sign-in"
              severity="primary"
              className="category-button"
              onClick={handleLogin}
            />
            <Button
              label="Créer un compte"
              icon="pi pi-user-plus"
              severity="success"
              className="category-button"
              outlined
              onClick={handleRegister}
            />
          </div>

          <Divider />
          <p style={{ fontSize: "0.9rem", color: "#777" }}>
            Une fois connecté, vous serez redirigé vers la page de création
            d’événement.
          </p>
        </div>
      </Dialog>
    </section>
  );
}
