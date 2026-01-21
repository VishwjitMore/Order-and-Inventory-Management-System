import { Router } from "express";
import { signup } from "../controllers/auth.controllers";
import { login } from "../controllers/auth.controllers";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
