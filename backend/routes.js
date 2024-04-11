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
      let data = {...request.body};
      if(data['UserName']){
        let record = await (new models.UserModel(data)).save();
        record = Global.getRecords(record)
        let dir = Global.CreateFolder(record['_id']);
        /**
         * @type{ArrayBuffer}
         */
        let arr_buf = Array.isArray(request.files['ProfilePicture'])?(request.files['ProfilePicture'][0]['data']):(request.files['ProfilePicture']['data']);
        fs.writeFileSync(dir+'/dp.png',arr_buf);
        response.send(record);  
      }else{
        let record = await models.UserModel.findOne(data);
        (record)?
          (response.send(Global.getRecords(record))):
          (response.send({err:'not an user'}));
      }
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