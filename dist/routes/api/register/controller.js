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
exports.postRegister = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../../../models/user");
const transporter = nodemailer_1.default.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
const postRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const firstname = req.body.first_name;
        const lastname = req.body.last_name;
        const phoneno = req.body.phone_no;
        let user = yield user_1.User.findOne({ email });
        if (user !== null) {
            res.status(400).json({ message: "Email already exist" });
            return;
        }
        user = yield user_1.User.findOne({ phoneno });
        if (user !== null) {
            res.status(400).json({ message: "Phone no already exist" });
            return;
        }
        let otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp.toFixed(0));
        const mailOptions = {
            from: "arijitchowdhury005@gmail.com",
            to: email,
            subject: "OTP for Login",
            html: `<h3>OTP for your login is </h3> <h1 style='font-weight:bold;'>${otp}</h1>`,
        };
        transporter.sendMail(mailOptions, (err, _info) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                res.status(400).json({ error: err });
            }
            else {
                console.log("Message sent: %s", _info.messageId);
                console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(_info));
                const hash = yield bcrypt_1.default.hash(otp.toString(), 10);
                const user = new user_1.User({
                    email,
                    firstname,
                    lastname,
                    phoneno,
                    otp: hash,
                });
                user.save();
                res.status(200).json({ message: "OTP sent" });
            }
        }));
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went wrong" });
    }
});
exports.postRegister = postRegister;
//# sourceMappingURL=controller.js.map