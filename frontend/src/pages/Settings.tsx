import React from "react";
// import IonIcon from "@reacticons/ionicons";
// import * as CUI from "@chakra-ui/react";
// import CustomFile from "../Components/CustomFile";
// import CSP from "../Components/CustomSearchPanel";
// import { useDropzone } from "react-dropzone";
// import CustomHeader from "../Components/CustomHeader";
// import * as CT from "./../CustomTypes/types";
// import fileSvg from "./../assets/empty-bucket.svg";
const Settings: React.FC = () => {
  window.onload= async ()=>{
    const data = await fetch('/api'+window.location.pathname,{method:'POST'}).then(res=>res.json());
    console.log(data);
  }
  return(
  <>
  {window.location.pathname}
  </>
  )
}
export default Settings;