import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useApp } from "../../hooks/useApp";
import fetchApi from "../../helpers/fetchApi";
import Logo from "../../assets/Umugenzi-Logo.png";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, handleLogin } = useAuth();
  const { setToastAction } = useApp();

  useEffect(() => {
    document.title = "Connexion - Umugenzi";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const response = await fetchApi("/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      await handleLogin(response);

      setToastAction({
        severity: "success",
        summary: "Succès",
        detail: "Connexion réussie",
        life: 3000,
      });
      setErrors(null);
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
        {/* Logo centré */}
        <div className="flex justify-content-center">
          <img
            src={Logo}
            alt="Logo Umugenzi"
            style={{ width: "150px", height: "", objectFit: "contain" }}
          />
        </div>

        <h4 className="text-center mb-3">Connexion</h4>
        <p className="text-center text-muted mb-4">
          Connectez-vous pour créer ou gérer vos événements.
        </p>

        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field mb-3">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={data.email}
              type="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className={errors?.email ? "p-invalid" : ""}
              placeholder="exemple@email.com"
            />
            {errors?.email && <small className="p-error">{errors.email}</small>}
          </div>

          <div className="field mb-3">
            <label htmlFor="password">Mot de passe</label>
            <Password
              id="password"
              feedback={false}
              toggleMask
              inputClassName={errors?.password ? "p-invalid" : ""}
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Votre mot de passe"
            />
            {errors?.password && (
              <small className="p-error">{errors.password}</small>
            )}
          </div>

          <Button
            label="Se connecter"
            icon="pi pi-sign-in"
            className="mx-auto mt-2 btn-primary button-rounded block"
            loading={isSubmitting}
          />

          <Divider align="center">
            <span>OU</span>
          </Divider>

          <div className="text-center">
            <span>Pas encore de compte ? </span>
            <Link to="/signup" className="font-bold">
              Créer un compte
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
