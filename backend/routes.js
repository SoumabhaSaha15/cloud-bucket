import express from "express";
import fs from 'fs';
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';
import models from "./models.js";
import JWT from 'jsonwebtoken'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Global from "./global.js";
const ROUTES = {
  POST:{
    /**
     * Manages users entry and login
     * @param {express.Request} request 
     * @param {express.Response} response 
     */
    authentication:async (request,response)=>{
      console.log(request.body);
      console.table(request.files);
      response.send({'data':'response sent'});  
    },
    /**
    * manages user settings 
    * @param {express.Request} request 
    * @param {express.Response} response 
    */
    settings:async (request,response) => {
      
      try{

      }catch(err){
        console.log(err.message);
      }
    } 
  }
}
export default ROUTES;