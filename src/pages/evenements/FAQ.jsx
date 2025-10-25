import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

export default function FAQ() {
  const faqItems = [
    {
      question: "Comment fonctionne votre service ?",
      answer:
        "Notre service fonctionne en quelques étapes simples : sélection du service, réservation en ligne, paiement sécurisé et confirmation immédiate."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer:
        "Nous acceptons les paiements par carte, mobile money et d’autres options électroniques sécurisées."
    },
    {
      question: "Mes informations personnelles sont-elles sécurisées ?",
      answer:
        "Oui, toutes vos données sont chiffrées et protégées selon les normes les plus strictes de sécurité."
    },
    {
      question: "Puis-je annuler ou modifier ma réservation ?",
      answer:
        "Oui, vous pouvez annuler ou modifier votre réservation directement depuis votre compte, selon nos conditions générales."
    },
    {
      question: "Y a-t-il des frais supplémentaires cachés ?",
      answer:
        "Non, tous les frais sont clairement indiqués avant le paiement. Aucun coût supplémentaire n’est ajouté après confirmation."
    },
    {
      question: "Comment contacter le support en cas de problème ?",
      answer:
        "Vous pouvez nous contacter via le formulaire de contact, par email ou par téléphone. Nous répondons généralement sous 24 heures."
    }
  ];

  return (
    <section 
      className="faq-section" 
      style={{ 
        display: "flex", 
        justifyContent: "center",
        alignItems: "center", 
        backgroundColor: "#f8f9fa", 
        flexDirection: "column"
      }}
    >
      <div className="p-d-flex p-jc-center p-ai-center" style={{ height: "100%" }}>
        <div style={{ maxWidth: "800px", width: "100%" }}>
          <h2
            className="p-text-center"
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#333",
              marginBottom: "2rem",
              textAlign: "center"
            }}
          >
            Questions fréquentes
          </h2>

          <Accordion multiple activeIndex={[0]}>
            {faqItems.map((item, index) => (
              <AccordionTab key={index} header={item.question}>
                <p style={{ lineHeight: "1.6", color: "#555", fontSize: "1rem", margin: 0 }}>{item.answer}</p>
              </AccordionTab>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
