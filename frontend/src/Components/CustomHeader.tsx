import React from "react";
import IonIcon from '@reacticons/ionicons';
import * as CUI from  "@chakra-ui/react";
type UserDP = {
  link:string
}
const CustomHeader:React.FC<UserDP> =(props:UserDP)=>{
  
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
      <CUI.HStack spacing={'10px'} alignItems={'center'}>
        <CUI.Tooltip label = {'sage-adebayo'}>
          <CUI.Popover>
            <CUI.PopoverTrigger>
              <CUI.Avatar 
                maxHeight={'6vh'} 
                maxWidth={'6vh'}
                aspectRatio={'1/1'} 
                src={props.link}
              />
            </CUI.PopoverTrigger>
            <CUI.PopoverContent borderRadius={'10px'}>
              <CUI.PopoverArrow bg={'purple.500'}/>
              <CUI.PopoverBody 
                bgColor={'gray.300'} 
                borderRadius={'10px'}
              >
                <CUI.Button 
                  colorScheme="purple"
                  leftIcon={<IonIcon name='settings'/>} 
                  children={'go to account Settings'}
                />
              </CUI.PopoverBody>
            </CUI.PopoverContent>
          </CUI.Popover>
        </CUI.Tooltip>
      </CUI.HStack>
  </>
  );
}
export default CustomHeader