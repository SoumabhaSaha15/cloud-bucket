import React from "react";
import * as CUI from '@chakra-ui/react'
const CustomFile:React.FC<{text:string}>=(props)=> {
  // console.log(props)
  return (
    <>
    <CUI.Box 
      children={props.text} 
      border={'1px solid #805ad5'} 
      textAlign={'center'}
      
    />
    </>
  )
}
export default CustomFile;