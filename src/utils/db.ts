import Mongoose from "mongoose";

let db: Mongoose.Connection;

export const connect = async () => {
  let db: Mongoose.Connection;

  await Mongoose.connect(process.env.DB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  db = Mongoose.connection;

  db.once("open", async () => {
    console.log("Connected to db");
  });
  db.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!db) {
    return;
  }
  Mongoose.disconnect();
};
