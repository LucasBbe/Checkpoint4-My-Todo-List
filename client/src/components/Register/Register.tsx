import { useState } from "react";
import { toast } from "react-toastify";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Compte créé avec succès !");
      setTimeout(() => navigate("/login"), 2500);
    } else {
      toast.error("Erreur lors de l'inscription !");
    }
  };

  return (
    <section className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" onChange={handleChange} required />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
        />
        <button type="submit">S'inscrire</button>
        <Link to="/" className="auth-back-btn">
          ← Retour
        </Link>
      </form>
    </section>
  );
};

export default Register;
