import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import loginActions from "./modules/LoginRegister/loginActions";
import cardActions from "./modules/card/cardActions";
import listActions from "./modules/list/listActions";
import tableActions from "./modules/table/tableActions";

router.post("/api/register", loginActions.register);
router.post("/api/login", loginActions.login);

router.get("/api/table", tableActions.browse);
router.get("/api/table/:id", tableActions.read);
router.post("/api/table", tableActions.add);
router.put("/api/table/:id", tableActions.update);
router.delete("/api/table/:id", tableActions.remove);

// Routes pour les listes
router.get("/api/lists/:tableId", listActions.read);
router.post("/api/lists", listActions.add);
router.put("/api/lists/:id", listActions.update);
router.delete("/api/lists/:id", listActions.remove);

// Routes pour les cartes
router.get("/api/cards/:listId", cardActions.read);
router.post("/api/cards", cardActions.add);
router.put("/api/cards/:id", cardActions.update);
router.delete("/api/cards/:id", cardActions.remove);

/* ************************************************************************* */

export default router;
