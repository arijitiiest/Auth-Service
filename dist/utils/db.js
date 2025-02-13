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
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let db;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    let db;
    yield mongoose_1.default.connect(process.env.DB_URI || "", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    db = mongoose_1.default.connection;
    db.once("open", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Connected to db");
    }));
    db.on("error", () => {
        console.log("Error connecting to database");
    });
});
exports.connect = connect;
const disconnect = () => {
    if (!db) {
        return;
    }
    mongoose_1.default.disconnect();
};
exports.disconnect = disconnect;
//# sourceMappingURL=db.js.map