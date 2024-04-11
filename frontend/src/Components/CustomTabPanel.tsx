import React from "react";
import * as CUI from '@chakra-ui/react'
const CustomTab:React.FC<number>=(props)=> {
  console.log(props)
  return (
    <>
    <CUI.Box children={'hello2'} border={'1px solid red'} textAlign={'center'}/>
    </>
  )
}
export default CustomTab;