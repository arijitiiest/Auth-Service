import { Router } from "express";

import {postRegister} from "./controller";

const router = Router();

router.post("/", postRegister);

export default router;