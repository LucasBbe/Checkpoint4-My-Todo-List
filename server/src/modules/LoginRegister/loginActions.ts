import type { RequestHandler } from "express";
import UserRepository from "./loginRepository";

const register: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "Tous les champs sont requis" });
    return;
  }

  try {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "Email déjà utilisé" });
      return;
    }

    const userId = await UserRepository.create({ name, email, password });

    res.status(201).json({ id: userId, name, email });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Tous les champs sont requis" });
    return;
  }

  try {
    const user = await UserRepository.findByEmail(email);
    if (!user || user.password !== password) {
      res.status(401).json({ message: "Identifiants incorrects" });
      return;
    }

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

export default { register, login };
