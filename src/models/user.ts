import { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstname: string;
  lastname: string;
  phoneno: string;
  otp: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneno: { type: String, required: true },
  otp: { type: String, required: true },
});

export const User: Model<IUser> = model("User", UserSchema);
