import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../../../models/user";

export const getIsAuth = async (req: Request, res: Response) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization || "",
      process.env.SECRET_KEY || ""
    );
    // console.log(decoded);
    const user = User.findById(decoded);
    if (user === null)
      res.status(400).json({ is_auth: false, message: "Not Authorized" });
    res.status(200).json({ is_auth: true, message: "Authorized" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ is_auth: false, message: "Not Authorized" });
  }
};
