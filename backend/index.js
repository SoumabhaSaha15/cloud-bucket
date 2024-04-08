import express from "express";
import path from 'path';
import dotenv from "dotenv";
import routes from "./routes.js";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import CookieParser from "cookie-parser";
import ExpressFileUpload from "express-fileupload";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


(async () => {
  try {
    dotenv.config();
    const APP = express();
    await mongoose.connect(process.env.DATABASE_URL);


    APP.use(express.static(__dirname + '/public'));
    APP.use(express.json());
    APP.use(express.urlencoded({ extended: true }));
    APP.use(CookieParser());
    APP.use(ExpressFileUpload({ safeFileNames: true }));


    APP.post('/api/user-authentication', routes.POST.authentication);

    APP.post('/api/settings', routes.POST.settings);

    APP.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  }
  catch (error) {
    console.log(error.message);
  }

})();