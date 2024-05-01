import express, { response } from "express";
import fs from 'fs';
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';
import models from "./models.js";
import JWT from 'jsonwebtoken'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Global from "./global.js";
import { request } from "http";
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
          response.send({'redirect':'files'});  
  
        }else{
          let record = await models.UserModel.findOne(data);
          (record)?
            (()=>{
              record = Global.getRecords(record);
              delete record['Password'];
              let dir = `${__dirname}/public/client/${record['_id']}`
              response.cookie("user_token",JWT.sign(record['_id'],process.env.SECRET_KEY),{httpOnly:true});
              response.send({'redirect':'files'});
            })():
            (()=>{throw new Error('invalid user credentils')})();
        }
        
      }catch(err){
        response.send({err_msg:err?.message})
      }
    },
    /**
    * sends file 
    * @param {express.Request} request 
    * @param {express.Response} response 
    */
    files:async(request,response)=>{
      try{
        if(request.cookies['user_token']){
          let id =  Global.parseJWT('user_token',request.cookies);
          if(id){
            let  rec = Global.getRecords(await models.UserModel.findById(id));
            if(rec){
              let files = Global.getFiles(rec['_id']);
              let dp = (`http://localhost:${process.env.PORT}/client/${rec['_id']}/dp.png`);
              response.send({'files':files,'dp':dp});
            }else{
              throw new Error('user not logged in');
            }
          }else{
            throw new Error('user not loggged in');
          }
        }else{
          throw new Error('user not loggged in');
        }

      }catch(e){
        response.send({err_msg:e.message,redirect:'user-authentication'});
      }
    },
    /**
    * manages user settings 
    * @param {express.Request} request 
    * @param {express.Response} response 
    */
    settings:async (request,response) => {
      try{
        if(request.cookies['user_token']){
          let id =  Global.parseJWT('user_token',request.cookies);
          if(id){
            let  rec = Global.getRecords(await models.UserModel.findById(id));
            if(rec){
              let size = Global.getFolderSize(Global.getUserPath(rec._id));
              response.send({diskSize:size,Email:rec.Email,UserName:rec.UserName,DP:`http://localhost:${process.env.PORT}/client/${rec['_id']}/dp.png`});
            }else{
              throw new Error('user not found');
            }
          }else{
            throw new Error('user not loggged in');
          }
        }else{
          throw new Error('user not loggged in');
        }
      }catch(err){
        response.send({err_msg:err.message,redirect:'user-authentication'});
      }
    }, 
    /**
     * Upload page
     * @param {express.Request} request 
     * @param {express.Response} response 
     */
    upload:async (request,response)=>{
      try{
        if(request.cookies['user_token']){
          let id =  Global.parseJWT('user_token',request.cookies);
          if(id){
            let  rec = Global.getRecords(await models.UserModel.findById(id));
            if(rec){
              if(!Array.isArray(request.files.File)){
                let file = request.files.File;
                let neme = Global.writeFiles(file.data,id,file.name);
                response.send({'name':neme});
              }
            }else{
              throw new Error('user not found');
            }
          }else{
            throw new Error('user not loggged in');
          }
        }else{
          throw new Error('user not loggged in');
        }
      }catch(e){
        response.send({err_msg:e.message});
      }
    },
    /**
     * delete files 
     * @param {express.Request} request
     * @param {express.Response} response
     */
    delete:async(request,response)=>{
      try{
        if(request.cookies['user_token']){
          let id =  Global.parseJWT('user_token',request.cookies);
          if(id){
            fs.unlinkSync(`${__dirname}/public/client/${id}/files/${request.body.fileName}`);
            response.send({'deleted':true,'fileName':request.body.fileName});
          }else{
            throw new Error('user not loggged in');
          }
        }else{
          throw new Error('user not loggged in');
        }
      }catch(e){
        response.send({err_msg:e.message});
      }
    },
    /**
     * delete Account
     * @param {express.Request} request
     * @param {express.Response} response
     */
    deleteAccount:async(request,response)=>{
      console.log(request.body);
      response.send({...request.body,date:Date.now()});
    }
  }
}
export default ROUTES;