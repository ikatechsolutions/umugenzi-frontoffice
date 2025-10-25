import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchApi from "../../../helpers/fetchApi";
import Loading from "../../../components/layouts/Loading";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { useApp } from "../../../hooks/useApp";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToastAction } = useApp();
  const [errors, setErrors] = useState({});
  const [showConfirmEmailModal, setShowConfirmEmailModal] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Quand on clique sur "Acheter"
  const handleBuyClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowChoiceModal(true);
  };

  // Si l'utilisateur choisit "Continuer sans compte"
  const handleContinueWithoutAccount = () => {
    setShowChoiceModal(false);
    setShowPurchaseModal(true);
  }

  // Si l'utilisateur choisit "Créer un compte"
  const handleCreateAccount = () => {
    setShowChoiceModal(false);
    navigate("/register");
  };

  // ✅ Validation du format email avec une regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // 🟡 Étape avant achat — confirmation de l’email
  const handleBeforePurchase = () => {
    if (!validateEmail(email)) {
      alert("Veuillez entrer un email valide avant de continuer.");
      return;
    }
    setShowConfirmEmailModal(true);
  };

  // Achat d'un ticket
  const handlePurchase = async () => {
    try {
      setIsSubmitting(true);

      const payload = {
        ticket_id: selectedTicket.id,
        email,
        quantite: quantity
      };

      const response = await fetchApi("/reservations", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type" : "application/json" },
      });

      if (response.status === "success") {
        alert(`✅ Réservation effectuée avec succès !
          Ticket : ${selectedTicket.nom}
          Quantité : ${quantity}
          Total : ${(selectedTicket.prix * quantity).toLocaleString()} BIF
          Email : ${email}`);
      } else {
        alert(`❌ Erreur : ${response.message || "Échec de la réservation"}`);
      }

      setToastAction({
          severity: "success",
          summary: "Success",
          detail: response.message,
          life: 3000,
      })
      // ici tu feras l'appel backend plus tard
      setShowConfirmEmailModal(false);
      setShowPurchaseModal(false);
    } catch (response) {
      // console.error("Erreur lors de la reservation :", error);
      // alert("❌ Une erreur est survenue lors de la réservation du ticket.");
      if (response.httpStatus === 422) {
          setErrors(response.errors);
      }

      setToastAction({
          severity: "error",
          summary: "Erreur",
          detail: response.message,
          life: 3000,
      })
    } finally {
      setIsSubmitting(false);
    }
    
  };

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchApi(`/evenements/${id}`);
      setEvent(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger l'événement.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  if (loading) return <Loading />;
  if (error) return <p style={{ textAlign: "center", padding: "5rem", color: "red" }}>{error}</p>;

  if (!event) return null;

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Image principale */}
      <div style={{ width: "100%", height: "400px", overflow: "hidden", borderRadius: "1rem", marginBottom: "1.5rem" }}>
        <img
          src={event.image || "/assets/placeholder-event.png"}
          alt={event.titre}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Titre, date, lieu, catégorie */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>{event.titre}</h1>
        <Badge value={event?.categorie?.nom} severity="info" style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }} />
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", color: "#6b7280", marginBottom: "0.5rem" }}>
          <Calendar size={18} color="#7c3aed" />
          <span>{new Date(event.date_event).toLocaleDateString("fr-FR")}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", color: "#6b7280" }}>
          <MapPin size={18} color="#7c3aed" />
          <span>{event.place}</span>
        </div>
      </div>

      {/* Description */}
      <p style={{ textAlign: "justify", lineHeight: "1.7", color: "#374151", marginBottom: "2rem" }}>
        {event.description || "Pas de description disponible pour cet événement."}
      </p>

      {/* Types de tickets */}
      {event.typetickets && event.typetickets.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Types de tickets</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {event.typetickets.map((ticket, index) => (
              <Card
                key={index}
                className="p-shadow-3"
                style={{
                  width: "200px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
                }}
              >
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                  {ticket.nom}
                </h3>
                <p style={{ marginBottom: "0.5rem", color: "#6b7280" }}>Prix: {ticket.prix} BIF</p>
                <p style={{ marginBottom: "0.5rem", color: "#6b7280" }}>Disponibles: {ticket?.tickets?.[0]?.quantite ?? 0}</p>
                <Button
                  label="Acheter"
                  icon="pi pi-ticket"
                  severity="success"
                  onClick={() => handleBuyClick(ticket)}
                  style={{ width: "100%", borderRadius: "1rem" }}
                />
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Carte interactive (optionnelle) */}
      {event.location && (
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Emplacement</h2>
          <div style={{ width: "100%", height: "300px", borderRadius: "1rem", overflow: "hidden" }}>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(event.place)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}

      {/* 🟣 Modal 1 — Choix avant achat */}
      <Dialog
        header="Acheter un ticket"
        visible={showChoiceModal}
        style={{ width: "600px" }}
        onHide={() => setShowChoiceModal(false)}
      >
        <p>Souhaitez-vous vous connecter avant d'acheter votre ticket ?</p>
        <div className="flex justify-content-around mt-4">
          <Button label="Créer un compte" icon="pi pi-user-plus" onClick={handleCreateAccount} severity="info" className="button-rounded block" />
          <Button label="Continuer sans compte" icon="pi pi-arrow-right" onClick={handleContinueWithoutAccount} severity="success" className="mx-2 button-rounded block" />
        </div>
      </Dialog>

      {/* 🟢 Modal 2 — Achat sans compte */}
      <Dialog
        header="Acheter un ticket"
        visible={showPurchaseModal}
        style={{ width: "400px" }}
        onHide={() => setShowPurchaseModal(false)}
      >
        {selectedTicket && (
          <div className="flex flex-column gap-3">
            <p><strong>Type de ticket :</strong> {selectedTicket.nom}</p>
            <p><strong>Prix unitaire :</strong> {selectedTicket.prix} BIF</p>

            <div>
              <label>Email (pour recevoir le ticket)</label>
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@gmail.com"
                style={{ width: "100%" }}
                className={!validateEmail(email) && email ? "p-invalid" : ""}
              />
              {!validateEmail(email) && email && (
                <small className="p-error">Veuillez entrer un email valide.</small>
              )}
            </div>

            <div>
              <label>Quantité</label>
              <InputNumber
                value={quantity}
                onValueChange={(e) => setQuantity(e.value)}
                min={1}
                max={selectedTicket.quantite}
                style={{ width: "100%" }}
                showButtons
              />
            </div>

            <div className="text-center mt-2">
              <strong>Total :</strong>{" "}
              <span style={{ color: "#7c3aed", fontSize: "1.2rem" }}>
                {(selectedTicket.prix * quantity).toLocaleString()} BIF
              </span>
            </div>

            <Button
              label="Confirmer l'achat"
              icon="pi pi-check"
              severity="success"
              onClick={handleBeforePurchase}
              disabled={!email || !validateEmail(email)}
              style={{ width: "100%", borderRadius: "1rem" }}
              className="mt-2 block"
            />
          </div>
        )}
      </Dialog>

      {/* 🟣 Modal 3 — Confirmation d'email */}
      <Dialog
        header="Confirmation de l'email"
        visible={showConfirmEmailModal}
        style={{ width: "350px" }}
        onHide={() => setShowConfirmEmailModal(false)}
      >
        <div className="text-center">
          <p>
            <strong>{email}</strong>
          </p>
          <p>Est-ce bien votre adresse email ?</p>
          <div className="flex justify-content-around mt-3">
            <Button
              label="Oui"
              icon={isSubmitting ? `pi pi-spin pi-spinner` : `pi pi-check`}
              severity="success"
              onClick={handlePurchase}
              className="button-rounded mt-2"
              disabled={isSubmitting}
            />
            <Button
              label="Non"
              icon="pi pi-pencil"
              severity="warning"
              onClick={() => {
                setShowConfirmEmailModal(false);
                setShowPurchaseModal(true);
              }}
              className="button-rounded mt-2"
            />
          </div>
          
          <Divider />
            <p style={{ fontSize: "0.9rem", color: "#777" }}>
              <span className="font-bold">Attention: </span>Une adresse e-mail inexacte peut entrainer la non-distribution des tickets!
            </p>
        </div>
      </Dialog>

    </div>
    
  );
}
