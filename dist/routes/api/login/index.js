"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = express_1.Router();
router.post("/", controller_1.postLogin);
exports.default = router;
//# sourceMappingURL=index.js.map