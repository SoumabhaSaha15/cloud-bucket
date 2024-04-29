import React from "react";
import * as CUI from  "@chakra-ui/react";

const CustomSettingHeader:React.FC =()=>{
  
  return(
  <>
    <CUI.Avatar 
        src={'./../src/assets/react.svg'} 
        style={{maxHeight:'100%'}} 
        maxHeight={'6vh'}
        maxWidth={'6vh'}
        aspectRatio={'1/1'}
      />
      <CUI.Spacer/>
      
  </>
  );
}
export default CustomSettingHeader;