import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import loginActions from "./modules/LoginRegister/loginActions";
import itemActions from "./modules/item/itemActions";
import listActions from "./modules/list/listActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.post("/api/list", listActions.add);

router.post("/api/register", loginActions.register);
router.post("/api/login", loginActions.login);

/* ************************************************************************* */

export default router;
