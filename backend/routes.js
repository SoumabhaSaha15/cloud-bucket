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
      
      try{
        if(data['UserName']){
          /**
           * @type {any}
           */
          let record = await (new models.UserModel(data)).save();
          
          record = Global.getRecords(record);
          delete record['Password'];
          let dir = Global.CreateFolder(record['_id']);
          /**
           * @type{ArrayBuffer}
           */
          response.cookie("user_token",JWT.sign(record['_id'],process.env.SECRET_KEY),{httpOnly:true});
          let arr_buf = Array.isArray(request.files['ProfilePicture'])?(request.files['ProfilePicture'][0]['data']):(request.files['ProfilePicture']['data']);
          
          fs.writeFileSync(dir+'/dp.png',arr_buf);
          fs.mkdirSync(dir+'/files');
          response.send({...record,'dp':(dir+'/dp.png'),'redirect':'files'});  
  
        }else{
          let record = await models.UserModel.findOne(data);
          (record)?
            (()=>{
              record = Global.getRecords(record);
              delete record['Password'];
              let dir = `${__dirname}/public/client/${record['_id']}`
              response.send({...Global.getRecords(record),'redirect':'files','dp':(dir+'/dp.png')});
              response.cookie("user_token",JWT.sign(record['_id'],process.env.SECRET_KEY),{httpOnly:true});
            })():
            (response.send({err:'not an user'}));
        }
        
      }catch(err){
        response.send({'err':err?.message})
      }
    },
    /**
    * sends file 
    * @param {express.Request} request 
    * @param {express.Response} response 
    */
    files:async(request,response)=>{
      if(request.cookies['user_token']){
        let id =  Global.parseJWT('user_token',request.cookies);
        if(id){
          let  rec = Global.getRecords(await models.UserModel.findById(id));
          if(rec){
            let files = fs.readdirSync( `${__dirname}/public/client/${rec['_id']}/files`).map(item => (`http://localhost:${process.env.PORT}/client/${rec['_id']}/files/${item}`));
            let dp = `http://localhost:${process.env.PORT}/client/${rec['_id']}/dp.png`;
            response.send({'files':files,...rec,'dp':dp});
          }else{

          }
        }

      }else{
        response.send({err:'not logged in ',redirect:'user-authentication'})
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