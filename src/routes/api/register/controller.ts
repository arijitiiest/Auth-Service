import { Request, Response } from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

import { User, IUser } from "../../../models/user";

const transporter = nodemailer.createTransport({
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

export const postRegister = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const firstname = req.body.first_name;
    const lastname = req.body.last_name;
    const phoneno = req.body.phone_no;

    let otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp.toFixed(0));

    const mailOptions = {
      from: "arijitchowdhury005@gmail.com",
      to: email,
      subject: "OTP for Login",
      html: `<h3>OTP for your login is </h3> <h1 style='font-weight:bold;'>${otp}</h1>`,
    };

    transporter.sendMail(mailOptions, async (err, _info) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: err });
      } else {
        console.log("Message sent: %s", _info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(_info));

        const hash = await bcrypt.hash(otp.toString(), 10);

        const user: IUser = new User({
          email,
          firstname,
          lastname,
          phoneno,
          otp: hash,
        });

        user.save();

        res.status(200).json({ message: "OTP sent" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};
