import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import fetchApi from "../../../../helpers/fetchApi";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useApp } from "../../../../hooks/useApp";
import { useAuth } from "../../../../hooks/useAuth";


export default function CreateEvent() {
  const [eventData, setEventData] = useState({
    titre: "",
    description: "",
    categorie_id: null,
    place: "",
    date_event: null,
    heure: null,
    image: null,
  });

  const { user } = useAuth()
  // console.log(user?.data?.user.id);
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToastAction } = useApp();
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [newTicket, setNewTicket] = useState({ nom: "", prix: 0, quantite: 0 });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resCategories = await fetchApi("/categories");
        
        const categorieList = resCategories.map((categorie) => ({
          code: categorie?.id,
          name: categorie?.nom
        }))
        
        setCategories(categorieList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.files[0];
    setEventData({ ...eventData, image: file });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!eventData.titre) newErrors.titre = "Le titre est requis";
    if (!eventData.description) newErrors.description = "La description est requise";
    if (!eventData.categorie_id) newErrors.categorie_id = "La catégorie est requise";
    if (!eventData.place) newErrors.place = "Le lieu est requis";
    if (!eventData.date_event) newErrors.date_event = "La date est requise";
    if (!eventData.heure) newErrors.heure = "L'heure est requise";
    if (!eventData.image) newErrors.image = "L'image est requise";
    if (tickets.length === 0) newErrors.tickets = "Ajoutez au moins un type de ticket";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  } 

  const isFormValid = 
    eventData.titre &&
    eventData.description &&
    eventData.categorie_id &&
    eventData.place &&
    eventData.date_event &&
    eventData.heure &&
    eventData.image &&
    tickets.length > 0;

  const handleAddTicket = () => {
    if (newTicket.nom && newTicket.prix > 0 && newTicket.quantite > 0) {
      if (newTicket.index !== undefined) {
        // Mise à jour d'un ticket existant
        const updated = [...tickets];
        updated[newTicket.index] = {
          nom: newTicket.nom,
          prix: newTicket.prix,
          quantite: newTicket.quantite,
        };
        setTickets(updated);
      } else {
        // Ajout d'un nouveau ticket
        setTickets([...tickets, { nom: newTicket.nom, prix: newTicket.prix, quantite: newTicket.quantite }]);
      }
      
      // Nettoyage
      setNewTicket({ nom: "", prix: 0, quantite: 0 });
      setShowTicketDialog(false);
    }
  };

  const handleDeleteTicket = (rowIndex) => {
    confirmDialog({
      message: "Êtes-vous sûr de vouloir supprimer ce ticket ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Oui",
      rejectLabel: "Non",
      acceptClassName: "p-button-danger",
      accept: () => {
        const updated = [...tickets];
        updated.splice(rowIndex, 1);
        setTickets(updated);
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      // Création du FormData pour un envoi multipart/form-data
      const formData = new FormData();

      // On ajoute les champs texte / numérique
      formData.append("titre", eventData.titre);
      formData.append("description", eventData.description);
      formData.append("place", eventData.place);
      
      // Conversion explicite de la date et de l'heure
      if (eventData.date_event instanceof Date) {
        const formattedDate = eventData.date_event.toISOString().split("T")[0]; // => "2025-10-12"
        formData.append("date_event", formattedDate);
      } else {
        formData.append("date_event", eventData.date_event);
      }

      if (eventData.heure instanceof Date) {
        const hours = eventData.heure.getHours().toString().padStart(2, "0");
        const minutes = eventData.heure.getMinutes().toString().padStart(2, "0");
        formData.append("heure", `${hours}:${minutes}`);
      } else {
        formData.append("heure", eventData.heure);
      }

      formData.append("user_id", user?.data?.user.id);
      formData.append("categorie_id", eventData.categorie_id);
      formData.append("typetickets", JSON.stringify(tickets));

      // ✅ Traitement de l'image
      // Vérifie que eventData.image est bien un objet File
      if (eventData.image instanceof File) {
        formData.append("image", eventData.image);
      } else {
        console.warn("⚠️ Aucune image valide sélectionnée !");
        return;
      }

      // ✅ Ajout des tickets (tableau converti en JSON string)
      formData.append("typetickets", JSON.stringify(tickets));


      // 🧩 Pour bien visualiser ce qu'on envoie
      // console.log("===== 📦 CONTENU DU FORMDATA =====");
      // for (const [key, value] of formData.entries()) {
      //   if (key === "image") {
      //     console.log(`${key}:`, value.name);
      //   } else {
      //     console.log(`${key}:`, value);
      //   }
      // }
      // console.log("=================================");


      // 🔥 Envoi vers le backend avec fetchApi
      const response = await fetchApi("/evenements", {
        method: "POST",
        body: formData,
      });

      setToastAction({
        severity: "success",
        summary: "Success",
        detail: response.message,
        life: 3000,
      })

      setErrors(null);
      
    } catch (response) {
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

  return (
    <div className="p-4">
      <Card title="Créer un nouvel événement" className="shadow-3">
        {/* --- Section Informations Générales --- */}
        <div className="grid formgrid p-fluid">
          <div className="col-12 md:col-6">
            <label htmlFor="title" className="block font-medium mb-2">Titre de l'événement</label>
            <InputText
              id="titre"
              value={eventData.titre}
              onChange={(e) => setEventData({ ...eventData, titre: e.target.value })}
              className={errors?.titre ? "p-invalid" : ""}
              placeholder="Entrez le titre"
            />
            {errors?.titre && <small className="p-error">{errors?.titre}</small>}
          </div>

          <div className="col-12 md:col-6">
            <label htmlFor="category" className="block font-medium mb-2">Catégorie</label>
            <Dropdown
              value={eventData.categorie_id}
              options={categories}
              optionLabel="name"
              optionValue="code"
              onChange={(e) => setEventData({ ...eventData, categorie_id: e.value })}
              className={errors?.categorie_id ? "p-invalid" : ""}
              placeholder="Choisissez une catégorie"
            />
            {errors?.categorie_id && (
              <small className="p-error">{errors?.categorie_id}</small>
            )}
          </div>

          <div className="col-12">
            <label htmlFor="description" className="block font-medium mb-2">Description</label>
            <InputTextarea
              id="description"
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              className={errors?.description ? "p-invalid" : ""}
              rows={4}
              placeholder="Décrivez votre événement"
            />
            {errors?.description && (
              <small className="p-error">{errors?.description}</small>
            )}
          </div>

          <div className="col-12 md:col-6">
            <label htmlFor="place" className="block font-medium mb-2">Place</label>
            <InputText
              id="place"
              value={eventData.place}
              onChange={(e) => setEventData({ ...eventData, place: e.target.value })}
              className={errors?.place ? "p-invalid" : ""}
              placeholder="Ex : Arena"
            />
            {errors?.place && <small className="p-error">{errors?.place}</small>}
          </div>

          <div className="col-6 md:col-3">
            <label htmlFor="date_event" className="block font-medium mb-2">Date</label>
            <Calendar
              id="date_event"
              value={eventData.date_event}
              onChange={(e) => setEventData({ ...eventData, date_event: e.value })}
              showIcon
              dateFormat="dd/mm/yy"
              minDate={new Date()}
              className={errors?.date_event ? "p-invalid" : ""}
            />
            {errors?.date_event && (
              <small className="p-error">{errors?.date_event}</small>
            )}
          </div>

          <div className="col-6 md:col-3">
            <label htmlFor="heure" className="block font-medium mb-2">Heure</label>
            <Calendar
              id="heure"
              value={eventData.heure}
              onChange={(e) => setEventData({ ...eventData, heure: e.value })}
              timeOnly
              hourFormat="24"
              className={errors?.heure ? "p-invalid" : ""}
            />
            {errors?.heure && <small className="p-error">{errors?.heure}</small>}
          </div>

          <div className="col-12">
            <label htmlFor="image" className="block font-medium mb-2">Image d'affiche</label>
            <FileUpload
              style={{ borderRadius: 0 }}
              chooseLabel={`choisir l'image`}
              cancelLabel={`Enlever`}
              name="image"
              uploadOptions={{
                  style: { display: "none" },
              }}
              className="p-invalid"
              accept="image/*"
              maxFileSize={200000}
              invalidFileSizeMessageDetail={`L'image est volumineuse`}
              emptyTemplate={
                  <p className="m-0">{`Glisser-déposer`}</p>
              }
              onSelect={async (e) => {
                  const file = e.files[0];
                  setEventData(d => ({ ...d, "image": file }))
              }}
              onClear={() => {
                  setEventData(d => ({ ...d, "image": null }))
              }}
            />
            {errors?.image && <small className="p-error">{errors?.image}</small>}
          </div>
        </div>

        <Divider />

        {/* --- Section Tickets --- */}
        <div className="mt-3">
          <div className="flex justify-content-between align-items-center mb-3">
            <h4>Types de tickets</h4>
            <Button
              label="Ajouter un ticket"
              icon="pi pi-plus"
              className="p-button-success"
              onClick={() => {
                setNewTicket({ nom: "", prix: 0, quantite: 0 })
                setShowTicketDialog(true)
              }}
            />
          </div>

          <DataTable value={tickets} responsiveLayout="scroll" emptyMessage="Aucun type de ticket trouvé">
            <Column field="nom" header="Nom du ticket"></Column>
            <Column field="prix" header="Prix"></Column>
            <Column field="quantite" header="Quantité"></Column>
            <Column
              header= "Actions"
              body= {(rowData, { rowIndex }) => (
                <div>
                  <Button
                    icon="pi pi-pencil"
                    className="button-rounded p-button-warning p-button-text" 
                    tooltip="Modifier"
                    onClick={() => {
                      setNewTicket({ ...rowData, index: rowIndex });
                      setShowTicketDialog(true);
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    className="button-rounded p-button-danger p-button-text"
                    tooltip="Supprimer"
                    onClick={() => handleDeleteTicket(rowIndex)}
                  />
                </div>
              )} 
            />
          </DataTable>
          {errors?.tickets && <small className="p-error">{errors?.tickets}</small>}
        </div>

        <Divider />

        {/* --- Enregistrement --- */}
        <div className="flex justify-content-end mt-3">
          <Button label="Enregistrer l'événement" icon={isSubmitting ? `pi pi-spin pi-spinner` : `pi pi-check`} onClick={handleSubmit} disabled={!isFormValid || isSubmitting} />
        </div>
      </Card>

      {/* --- Dialog pour ajout ticket --- */}
      <Dialog
        header="Ajouter un ticket"
        visible={showTicketDialog}
        style={{ width: "30rem" }}
        modal
        onHide={() => setShowTicketDialog(false)}
      >
        <div className="flex flex-column gap-3">
          <span className="p-float-label">
            <InputText
              id="ticketName"
              value={newTicket.nom}
              onChange={(e) => setNewTicket({ ...newTicket, nom: e.target.value })}
            />
            <label htmlFor="ticketName">Nom du ticket</label>
          </span>

          <span className="p-float-label mt-4">
            <InputNumber
              id="ticketPrice"
              value={newTicket.prix}
              onValueChange={(e) => setNewTicket({ ...newTicket, prix: e.value })}
              mode="currency"
              currency="BIF"
              locale="fr-FR"
            />
            <label htmlFor="ticketPrice">Prix</label>
          </span>

          <span className="p-float-label mt-4">
            <InputNumber
              id="ticketQty"
              value={newTicket.quantite}
              onValueChange={(e) => setNewTicket({ ...newTicket, quantite: e.value })}
            />
            <label htmlFor="ticketQty">Quantité</label>
          </span>

          <div className="flex justify-content-end">
            <Button 
              label="Ajouter" 
              icon="pi pi-check" 
              onClick={handleAddTicket} 
            />
          </div>
        </div>
      </Dialog>

      <ConfirmDialog />
    </div>
  );
}
