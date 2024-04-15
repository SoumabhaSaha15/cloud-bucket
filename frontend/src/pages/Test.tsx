import React from "react";
import IonIcon from '@reacticons/ionicons';
import * as CUI from  "@chakra-ui/react";
import {useDropzone} from 'react-dropzone'
const Test:React.FC = () => {
  const onDrop = React.useCallback((acc_file:Array<File>) => {
    console.log(acc_file);
  },[]);
  const {getRootProps,getInputProps,isDragActive} = useDropzone({onDrop});
  return (
    <>
    <CUI.Box {...getRootProps()}>
      <CUI.InputGroup>
        <CUI.InputLeftElement children={<IonIcon name="download"/>} />
        <CUI.Input {...getInputProps()}/>
        {
          isDragActive?(<CUI.InputRightElement children={'drag active'} />):(<CUI.InputRightElement children={'drag inactive'} />)
        }
      </CUI.InputGroup>
    </CUI.Box>
    </>
  )
}
export default Test;