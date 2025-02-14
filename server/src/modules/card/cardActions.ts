import type { RequestHandler } from "express";

import cardRepository from "./cardRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const TableId = Number(req.params.id);
    const table = await cardRepository.getCardsByListId(TableId);

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
    const { title, position, listId } = req.body;

    const insertId = await cardRepository.createCard(title, position, listId);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: "Le nouveau nom est requis." });
    return;
  }

  try {
    await cardRepository.updateCard(Number(id), title);
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
    await cardRepository.deleteCard(tableId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { read, add, update, remove };
