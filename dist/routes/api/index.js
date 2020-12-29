"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = __importDefault(require("./register"));
const login_1 = __importDefault(require("./login"));
const isauth_1 = __importDefault(require("./isauth"));
const router = express_1.Router();
router.use("/register", register_1.default);
router.use("/login", login_1.default);
router.use("/isauth", isauth_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map