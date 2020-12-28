import { Request, Response } from "express";

import { User } from "../../../models/user";

export const postLogin = async (req: Request, res: Response) => {
  try {
    const username = req.body.email_phone;
    const otp = req.body.otp;

    let user;
    user = await User.findOne({ email: username });

    if (user === null) {
      user = await User.findOne({ phoneno: username });
    }

    // console.log(user);

    if (user === null) {
      res.status(400).json({ message: "No User Found" });
    } else {
      if (user?.otp === otp) {
        res.status(200).json({ message: "Login Success" });
      } else {
        res.status(400).json({ message: "OTP Incorrect" });
      }
    }
  } catch (err) {
    console.log(err);
    res.json(400).json({ message: "Something went wrong", err: err });
  }
};
