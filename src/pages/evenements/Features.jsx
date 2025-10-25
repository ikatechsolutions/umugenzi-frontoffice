import { Shield, Zap, Smartphone, Headphones } from "lucide-react";
import { Card } from "primereact/card";

export default function Features() {
  const features = [
    {
      icon: <Zap className="p-icon" />,
      title: "Rapidité",
      text: "Réservez vos billets en quelques secondes avec confirmation instantanée.",
    },
    {
      icon: <Shield className="p-icon" />,
      title: "Sécurité",
      text: "Vos paiements et informations sont protégés par des technologies de pointe.",
    },
    {
      icon: <Smartphone className="p-icon" />,
      title: "100% Mobile",
      text: "Profitez d’une expérience fluide et optimisée pour smartphones et tablettes.",
    },
    {
      icon: <Headphones className="p-icon" />,
      title: "Support 24/7",
      text: "Notre équipe est disponible à tout moment pour répondre à vos besoins.",
    },
  ];

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '1.5rem 2rem' }}>
      {/* Titre */}
      <h2 className="text-center" style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.75rem' }}>
        Pourquoi choisir <span style={{ color: '#6b46c1' }}>Umugenzi</span> ?
      </h2>
      <p className="text-center" style={{ maxWidth: '550px', margin: '0 auto 1.5rem auto', color: '#6c757d', fontSize: '0.9rem' }}>
        Découvrez les avantages uniques qui rendent notre plateforme simple, rapide et fiable.
      </p>

      {/* Grille compacte */}
      <div className="flex justify-center gap-4 flex-wrap md:flex-nowrap">
        {features.map((feat, index) => (
          <div key={index} className="p-col-12 p-sm-6 p-md-3">
            <Card 
              className="p-card-hover p-shadow-2 p-text-center" 
              style={{ padding: '1rem', borderRadius: '0.75rem', minHeight: '180px' }}
            >
              <div style={{ color: '#6b46c1', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{feat.title}</h3>
              <p style={{ color: '#6c757d', fontSize: '0.85rem', margin: 0 }}>{feat.text}</p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
