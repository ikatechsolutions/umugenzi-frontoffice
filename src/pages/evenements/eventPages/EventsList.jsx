import React, { useEffect, useState, useCallback } from "react";
import fetchApi from "../../../helpers/fetchApi";
import Loading from "../../../components/layouts/Loading";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "primereact/button";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchApi("/evenements");
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les événements.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const categories = Array.from(new Set(events.map((e) => e.categorie?.nom))).filter(Boolean);

  const filteredEvents = events.filter((event) => {
    const matchTitle = event.titre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory ? event?.categorie?.nom === selectedCategory : true;
    return matchTitle && matchCategory;
  });

  if (loading) return <Loading />;
  if (error)
    return (
      <p style={{ textAlign: "center", padding: "5rem", color: "red" }}>
        {error}
      </p>
    );

  return (
    <div
      style={{
        padding: "2rem",
        background: "linear-gradient(to right, #f3e8ff, #ffffff, #f5f3ff)",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "2rem",
        }}
      >
        🎟️ Liste des Événements
      </h1>

      {/* Barre de recherche + filtres */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un événement..."
          style={{
            width: "280px",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
            outline: "none",
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Button
            label="Tous"
            severity={selectedCategory === "" ? "help" : "secondary"}
            outlined={selectedCategory !== ""}
            onClick={() => setSelectedCategory("")}
            style={{
              borderRadius: "2rem",
              padding: "0.5rem 1.2rem",
              fontWeight: "600",
            }}
          />
          {categories.map((cat, index) => (
            <Button
              key={index}
              label={cat}
              severity={selectedCategory === cat ? "help" : "secondary"}
              outlined={selectedCategory !== cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                borderRadius: "2rem",
                padding: "0.5rem 1.2rem",
                fontWeight: "600",
              }}
            />
          ))}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          Aucun événement trouvé.
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            style={{
              display: "flex",
              alignItems: "stretch",
              backgroundColor: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.01)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
            }}
          >
            {/* Image */}
            <div
              style={{
                width: "35%",
                height: "180px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={event.image || "/assets/placeholder-event.png"}
                alt={event.titre}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "#7c3aed",
                  color: "#fff",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "0.5rem",
                  fontWeight: "700",
                  fontSize: "0.85rem",
                }}
              >
                {new Date(event.date_event).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Contenu */}
            <div
              style={{
                flex: 1,
                padding: "1rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: "0.5rem",
                  }}
                >
                  {event.titre}
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#6b7280",
                    fontSize: "0.9rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  <MapPin size={16} color="#7c3aed" />
                  <span>{event.place}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#6b7280",
                    fontSize: "0.9rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  <Calendar size={16} color="#7c3aed" />
                  <span>
                    {new Date(event.date_event).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p
                  style={{
                    color: "#4b5563",
                    marginTop: "0.5rem",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  {event.description?.length > 100
                    ? event.description.substring(0, 100) + "..."
                    : event.description || "Pas de description."}
                </p>
              </div>

              {/* Bas (catégorie + bouton) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#fff",
                    padding: "0.3rem 0.7rem",
                    borderRadius: "0.5rem",
                    fontWeight: "600",
                    fontSize: "0.8rem",
                  }}
                >
                  {event?.categorie?.nom}
                </span>
                <Button
                  label="Voir détails"
                  icon="pi pi-eye"
                  severity="help"
                  onClick={() => navigate(`/event-details/${event.id}`)}
                  style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1.2rem",
                    fontWeight: "600",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
