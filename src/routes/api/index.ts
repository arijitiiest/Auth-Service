import { Router } from "express";

import registerApi from "./register";
import loginApi from "./login";
import isAuth from "./isauth"

const router = Router();

router.use("/register", registerApi);

router.use("/login", loginApi);

router.use("/isauth", isAuth);

export default router;