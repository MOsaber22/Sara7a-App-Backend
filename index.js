import * as dotenv from 'dotenv'
dotenv.config({})
import express from "express";
import bootstrap from "./src/app.controller.js";
import cors from "cors"
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
bootstrap(app, express);

app.listen(port, () => {
  console.log(`application is running on port ${port}`);
});


