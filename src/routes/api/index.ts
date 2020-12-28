import { Router } from "express";

import registerApi from "./register";
import loginApi from "./login";

const router = Router();

router.use("/register", registerApi);

router.use("/login", loginApi);

export default router;