import { Router } from "express";

import {postLogin} from "./controller";

const router = Router();

router.post("/", postLogin);

export default router;