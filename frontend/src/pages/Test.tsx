import React from "react";
import IonIcon from '@reacticons/ionicons';
import * as CUI from  "@chakra-ui/react";
import {useDropzone} from 'react-dropzone'
const Test:React.FC = () => {
  const onDrop = React.useCallback((acc_file:Array<File>) => {
    console.log(acc_file);
  },[]);
  const {getRootProps} = useDropzone({onDrop});
  return (
    <>
    <CUI.Box {...getRootProps()}>
      <CUI.InputGroup>
        <CUI.InputLeftElement children={<IonIcon name="download"/>} />
       
      </CUI.InputGroup>
    </CUI.Box>
    </>
  )
}
export default Test;