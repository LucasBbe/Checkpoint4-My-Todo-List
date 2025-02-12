import type { RequestHandler } from "express";

// Import access to data
import listRepository from "./listRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const list = await listRepository.readAll();

    res.json(list);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const listId = Number(req.params.id);
    const list = await listRepository.read(listId);

    if (list == null) {
      res.sendStatus(404);
    } else {
      res.json(list);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newItem = {
      name: req.body.name,
      position: req.body.position,
      table_id: req.body.table_id,
    };

    const insertId = await listRepository.create(newItem);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add };
