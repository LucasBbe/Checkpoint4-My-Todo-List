import { useState } from "react";
import { toast } from "react-toastify";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Connexion réussi !");
      login(data);
      setTimeout(() => navigate("/"), 2500);
    } else {
      toast.error("Erreur lors de la connexion !");
    }
  };

  return (
    <section className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
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
        <button type="submit">Se connecter</button>
        <Link to="/" className="auth-back-btn">
          ← Retour
        </Link>
      </form>
    </section>
  );
};

export default Login;
