import { Router } from "express";

import { getIsAuth } from "./controller";

const router = Router();

router.get("/", getIsAuth);

export default router;
