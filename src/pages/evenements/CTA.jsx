import React from "react";
import { Button } from "primereact/button";
import "../../styles/CTA.css";

export default function CTA() {
  return (
    <section
      style={{
        backgroundColor: "#6b21a8", // équivalent à bg-fuchsia-800
        color: "white",
        padding: "5rem 1rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Titre accrocheur */}
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
          }}
        >
          Prêt à simplifier vos réservations ?
        </h2>

        {/* Sous-texte rassurant */}
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "2rem",
            color: "#f3e8ff", // une teinte plus claire pour contraster
          }}
        >
          Rejoignez nos clients satisfaits dès aujourd'hui et profitez d'un
          service rapide, sûr et efficace.
        </p>

        {/* Bouton principal PrimeReact */}
        <Button
          label="Commencer maintenant"
          onClick={() => (window.location.href = "/signup")}
          className="cta-button"
        />
      </div>
    </section>
  );
}
