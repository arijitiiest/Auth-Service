"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.join(__dirname, "..", ".env") });
const api_1 = __importDefault(require("./routes/api"));
const db_1 = require("./utils/db");
const PORT = process.env.PORT || 5000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    yield db_1.connect();
    app.use(cors_1.default());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use("/api", api_1.default);
    app.use("/media", express_1.default.static(path_1.default.join(__dirname, "media")));
    app.use(express_1.default.static(path_1.default.join(__dirname, "..", "client", "build")));
    app.use("/", (_, res) => {
        res.sendFile(path_1.default.join(__dirname, "..", "client", "build", "index.html"));
    });
    app.listen(PORT, () => {
        console.log(`Server started at PORT ${PORT}`);
    });
}))();
//# sourceMappingURL=server.js.map