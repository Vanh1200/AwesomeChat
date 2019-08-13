import express from "express";
import ConnectDB from "./config/connectDB";
import ContactModel from "./models/contact.model";
let app = express();

//Connect to MongoDb
ConnectDB();

app.get("/test-database", async (req, res) => {
  try {
    let item = {
      userId: "53245454",
      contactId: "2345432545"
    };
    let contact = await ContactModel.createNew(item);
    res.send(contact);
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Hello Vanh1200 I'm running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`);
});
