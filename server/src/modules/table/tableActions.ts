import type { RequestHandler } from "express";

import TableRepository from "./tableRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const items = await TableRepository.readAll();

    res.json(items);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const TableId = Number(req.params.id);
    const table = await TableRepository.read(TableId);

    if (table == null) {
      res.sendStatus(404);
    } else {
      res.json(table);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newTable = {
      name: req.body.name,
      user_id: req.body.user_id || null,
    };

    const insertId = await TableRepository.create(newTable);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Le nouveau nom est requis." });
    return;
  }

  try {
    await TableRepository.update(Number(id), name);
    res.status(200).json({ message: "Tableau modifié avec succès." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification du tableau." });
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const tableId = Number(req.params.id);
    await TableRepository.delete(tableId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, update, remove };
