import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../../assets/Umugenzi-Logo.png";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#f9fafb", color: "#6b7280", padding: "3rem 1rem" }}>
      
      {/* Contenu principal */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "2rem",
          justifyContent: "space-between",
        }}
      >
        {/* Section 1 : Logo + description */}
        <div style={{ flex: "1 1 300px", minWidth: "250px" }}>
          <img src={Logo} alt="Umugenzi Logo" style={{ width: "160px", marginBottom: "1rem" }} />
          <p style={{ color: "#9ca3af", lineHeight: "1.6" }}>
            Simplifiez vos réservations et profitez d’un service rapide, sûr et efficace.
            <br />
            Nous rendons vos déplacements plus faciles et organisés.
          </p>
        </div>

        {/* Section 2 : Liens utiles */}
        <div style={{ flex: "1 1 200px", minWidth: "150px" }}>
          <h4 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", color: "#111827" }}>
            Liens utiles
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2" }}>
            <li><a href="/" style={{ color: "#6b7280", textDecoration: "none" }}>Accueil</a></li>
            <li><a href="/events" style={{ color: "#6b7280", textDecoration: "none" }}>Événements</a></li>
            <li><a href="/about" style={{ color: "#6b7280", textDecoration: "none" }}>À propos</a></li>
            <li><a href="/contact" style={{ color: "#6b7280", textDecoration: "none" }}>Contact</a></li>
          </ul>
        </div>

        {/* Section 3 : Contact & réseaux sociaux */}
        <div style={{ flex: "1 1 250px", minWidth: "200px" }}>
          <h4 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", color: "#111827" }}>
            Contact
          </h4>
          <p style={{ marginBottom: "0.5rem" }}>Email: support@umugenzi.com</p>
          <p style={{ marginBottom: "1rem" }}>Tel: +257 123 456 789</p>

          <div style={{ display: "flex", gap: "1rem", fontSize: "1.25rem" }}>
            <a href="#" style={{ color: "#6b7280", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color="#9333ea"} onMouseLeave={e => e.currentTarget.style.color="#6b7280"}><FaFacebookF /></a>
            <a href="#" style={{ color: "#6b7280", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color="#9333ea"} onMouseLeave={e => e.currentTarget.style.color="#6b7280"}><FaTwitter /></a>
            <a href="#" style={{ color: "#6b7280", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color="#9333ea"} onMouseLeave={e => e.currentTarget.style.color="#6b7280"}><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div style={{ marginTop: "3rem", borderTop: "1px solid #d1d5db", paddingTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "#9ca3af" }}>
        &copy; {new Date().getFullYear()} Umugenzi. Tous droits réservés.
      </div>
    </footer>
  );
}
