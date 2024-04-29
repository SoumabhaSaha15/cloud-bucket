import JWT from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * getrecords filters docs from mongodb
 * @name getRecords
 * @param {*} object 
 * @returns {object|null}
 */
const getRecords = (object)=> JSON.parse(JSON.stringify(object));
/**
 * returns an object containing only keys 
 * @param {string[]} keys 
 * @param {Object} data
 * @returns {object}
 */ 
const setObjectKeys = (keys,data) => {
  let newData = {};
  keys.forEach(item => {
    newData[item] = (data[item])?(data[item]):(null);
  });
  return newData;
}
/**
 * @name parseJWT
 * @param {string} token 
 * @param {Object} obj 
 * @returns {string|null}
 */
const parseJWT = (token,obj) => {
    try{
      return (JWT.verify(obj[token],process.env.SECRET_KEY));
    }catch(err){
      // console.log(err.message);
      return null;
    }
}
/**
 * @param {string} name 
 * @returns {string}
 */
const CreateFolder= (name)=>{
  try{
    fs.mkdirSync(`${__dirname}/public/client/${name}`);
    return `${__dirname}/public/client/${name}`;
  }catch(err){
    console.log(err.message);
    return null;
  }
}
/**
 * sends user dp
 * @param {string} id
 */
const getDP = id => (fs.existsSync(`${__dirname}/public/client/${id}/dp.png`))?(`./client/${id}/DP.png`):('');
/**
 * 
 * @param {string} dir 
 * @returns {string[]}
 */
const getFiles = dir => {
  let files = fs
  .readdirSync( `${__dirname}/public/client/${dir}/files`)
  .map(item => (`http://localhost:${process.env.PORT}/client/${dir}/files/${item}`));
  return files
}
/**
 * @param {ArrayBuffer} buffer
 * @param {string} pathId
 * @param {string} name
 * @returns {string}
 */
const writeFiles = (buffer,pathId,name) => {
  const filePath = `${__dirname}/public/client/${pathId}/files/${name}`;
  fs.writeFileSync(filePath,buffer);
  return `http://localhost:${process.env.PORT}/client/${pathId}/files/${name}`;
}
/**
 * get User path by _id
 * @param {string} pathId 
 * @returns {string}
 */
const getUserPath = (pathId) => (`${__dirname}/public/client/${pathId}/files`);
/**
 * @param {string} path folder path
 * @returns {number}
 */
const  getFolderSize = (path) => fs.readdirSync(path).map(item=>fs.statSync(path+'/'+item).size).reduce((acc,cur)=>(acc+cur),0);

export default {getRecords,setObjectKeys,parseJWT,CreateFolder,getDP,getFiles,writeFiles,getFolderSize,getUserPath};