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
exports.postLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../../models/user");
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.email_phone;
        const otp = req.body.otp;
        let user;
        user = yield user_1.User.findOne({ email: username });
        if (user === null) {
            user = yield user_1.User.findOne({ phoneno: username });
        }
        if (user === null) {
            res.status(400).json({ message: "No User Found" });
        }
        else {
            if (bcrypt_1.default.compareSync(otp, user.otp)) {
                const token = jsonwebtoken_1.default.sign(user._id.toString(), process.env.SECRET_KEY || "");
                res.status(200).json({ message: "Login Success", token });
            }
            else {
                res.status(400).json({ message: "OTP Incorrect" });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went wrong", err: err });
    }
});
exports.postLogin = postLogin;
//# sourceMappingURL=controller.js.map