import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useApp } from "../../hooks/useApp";
import fetchApi from "../../helpers/fetchApi";
import Logo from "../../assets/Umugenzi-Logo.png";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    adresse: "",
    photo: null, // en Base64
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, handleLogin } = useAuth();
  const { setToastAction } = useApp();

  useEffect(() => {
    document.title = "Créer un compte - Umugenzi";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPasswordRegex.test(data.password)) {
      setToastAction({
        severity: "warn",
        summary: "Mot de passe faible",
        detail:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
        life: 4000,
      });
      return;
    }

    if (data.password !== data.password_confirmation) {
      setToastAction({
        severity: "warn",
        summary: "Attention",
        detail: "Les mots de passe ne correspondent pas.",
        life: 3000,
      });
      return;
    }

    const { password_confirmation, ...payload } = data;

    try {
      setIsSubmitting(true);
      const response = await fetchApi("/register-manager", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      await handleLogin(response);
      setToastAction({
        severity: "success",
        summary: "Succès",
        detail: "Compte créé avec succès !",
        life: 3000,
      });
    } catch (response) {
      if (response.httpStatus === 422) setErrors(response.errors);
      setToastAction({
        severity: "error",
        summary: "Erreur",
        detail: response.message,
        life: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour convertir en Base64
  const handleFileSelect = async (e) => {
    const file = e.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((d) => ({ ...d, photo: reader.result })); // Base64
      };
      reader.readAsDataURL(file);
    }
  };

  if (user?.data) {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <div
      className="flex align-items-center justify-content-center min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-light) 100%)",
      }}
    >
      <Card className="shadow-4 w-11 sm:w-8 md:w-5 lg:w-4">
        {/* Logo Umugenzi */}
        <div className="flex justify-content-center">
          <img
            src={Logo}
            alt="Logo Umugenzi"
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>

        <h4 className="text-center mb-3">Créer un compte</h4>
        <p className="text-center text-muted mb-4">
          Inscrivez-vous pour devenir organisateur d’événements.
        </p>

        <form onSubmit={handleSubmit} className="p-fluid">
          {/* Nom + Email */}
          <div className="row">
            <div className="col-6">
              <label htmlFor="name">Nom complet</label>
              <InputText
                id="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className={errors?.name ? "p-invalid" : ""}
                placeholder="Votre nom complet"
              />
              {errors?.name && <small className="p-error">{errors.name}</small>}
            </div>
            <div className="col-6">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className={errors?.email ? "p-invalid" : ""}
                placeholder="exemple@email.com"
              />
              {errors?.email && <small className="p-error">{errors.email}</small>}
            </div>
          </div>

          {/* Téléphone + Adresse */}
          <div className="row mt-3">
            <div className="col-6">
              <label htmlFor="phone">Téléphone</label>
              <InputText
                id="phone"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className={errors?.phone ? "p-invalid" : ""}
                placeholder="Votre numéro de téléphone"
              />
              {errors?.phone && <small className="p-error">{errors.phone}</small>}
            </div>
            <div className="col-6">
              <label htmlFor="adresse">Adresse</label>
              <InputText
                id="adresse"
                value={data.adresse}
                onChange={(e) => setData({ ...data, adresse: e.target.value })}
                className={errors?.adresse ? "p-invalid" : ""}
                placeholder="Votre adresse"
              />
              {errors?.adresse && (
                <small className="p-error">{errors.adresse}</small>
              )}
            </div>
          </div>

          {/* Photo */}
          <div className="mt-3">
            <label htmlFor="photo">Photo de profil</label>
            <FileUpload
              chooseLabel="Choisir une image"
              cancelLabel="Enlever"
              accept="image/*"
              maxFileSize={200000}
              onSelect={handleFileSelect}
              onClear={() => setData((d) => ({ ...d, photo: null }))}
              uploadOptions={{ style: { display: "none" } }}
              emptyTemplate={<p className="m-0">Glisser-déposer ou cliquez</p>}
            />
            {errors?.photo && (
              <small className="p-error">{errors.photo}</small>
            )}
          </div>

          {/* Mot de passe */}
          <div className="row mt-3">
            <div className="col-6">
              <label htmlFor="password">Mot de passe</label>
              <Password
                id="password"
                feedback
                toggleMask
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                inputClassName={errors?.password ? "p-invalid" : ""}
                placeholder="Votre mot de passe"
                promptLabel="Entrez un mot de passe fort"
                weakLabel="Faible"
                mediumLabel="Moyen"
                strongLabel="Fort"
                // Définir la force minimale requise
                mediumRegex="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$"
                strongRegex="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$"
              />
              {errors?.password && (
                <small className="p-error">{errors.password}</small>
              )}
            </div>
            <div className="col-6">
              <label htmlFor="password_confirmation">
                Confirmer le mot de passe
              </label>
              <Password
                id="password_confirmation"
                feedback={false}
                toggleMask
                value={data.password_confirmation}
                onChange={(e) =>
                  setData({ ...data, password_confirmation: e.target.value })
                }
                inputClassName={
                  errors?.password_confirmation ? "p-invalid" : ""
                }
                placeholder="Confirmez votre mot de passe"
              />
              {errors?.password_confirmation && (
                <small className="p-error">
                  {errors.password_confirmation}
                </small>
              )}
            </div>
          </div>

          {/* Bouton */}
          <Button
            label="Créer un compte"
            icon="pi pi-user-plus"
            className="mx-auto mt-5 btn-primary button-rounded block"
            loading={isSubmitting}
          />

          <Divider align="center">
            <span>OU</span>
          </Divider>

          <div className="text-center">
            <span>Déjà un compte ? </span>
            <Link to="/login" className="font-bold">
              Se connecter
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
