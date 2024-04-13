import React from "react";
import IonIcon from '@reacticons/ionicons';
import * as CUI from  "@chakra-ui/react";
import CustomFile from "../Components/CustomFile";
import * as ReactDragAndDrop from "react-dnd";
import { NativeTypes } from 'react-dnd-html5-backend';
const Files:React.FC = () => {
  window.addEventListener('load',()=>{
    console.clear();
  });
  const [Width,SetWidth] = React.useState<string>(window.innerWidth.toString()+'px');
  window.onresize=()=>{
    SetWidth(window.innerWidth.toString()+'px');
  }
  const toast = CUI.useToast(); 
  const [{ isOver}, drop] = ReactDragAndDrop.useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop(item, monitor) {
      if (monitor) {
        const objs = monitor?.getItem();
        console.clear();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        objs?.files?.forEach((it)=>{
          toast({
            title:it?.name,
            description: "file uploaded",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        });

      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
  <>
  <CUI.Stack 
    w={Width}  
    overflow={'hidden'}
    gap={'0'}  
  >
    <CUI.Flex
      height={'8vh'}  
      minWidth={'100%'} 
      padding={'10px'}
      boxSizing={'border-box'}
      bg={"purple.500"}
      gap={'0'}
      alignItems={'center'}
    >
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
                src='https://bit.ly/sage-adebayo'
              />
            </CUI.PopoverTrigger>
            <CUI.PopoverContent borderRadius={'10px'}>
              <CUI.PopoverArrow bg={'purple.500'}/>
              <CUI.PopoverBody 
                bg='purple.500' 
                borderRadius={'10px'}
              >
                <CUI.Button 
                  leftIcon={<IonIcon name='settings'/>} 
                  children={'go to account Settings'}
                />
              </CUI.PopoverBody>
            </CUI.PopoverContent>
          </CUI.Popover>
        </CUI.Tooltip>
      </CUI.HStack>  
    </CUI.Flex>
    <CUI.Tabs  
        variant='line'
        colorScheme="purple"
    >
        <CUI.TabList height={'5vh'}>
          <CUI.Tab fontWeight={'700'} children={'one'}/>
          <CUI.Tab fontWeight={'700'} children={'two'}/>
          <CUI.Tab fontWeight={'700'} children={'three'}/>
        </CUI.TabList>

        <CUI.TabPanels 
          h={'87vh'} 
          overflow={'auto'}
          ref={drop}
          opacity={isOver?"0.2":"1"}
        >
          <CUI.TabPanel>
            <CUI.Grid 
              templateColumns={'repeat(auto-fill,min(320px,90%))'}
              autoRows={'250px'}
              style={{width:'100%'}}
              gap={'10px'}
              justifyContent={'space-evenly'}
              children = {[1,2,3,4].map(item=>item.toString()).map((item)=><CustomFile text={item} key={crypto.randomUUID()} />)}
            />
          </CUI.TabPanel>
          <CUI.TabPanel h="85vh">
          <CUI.Grid 
              templateColumns={'repeat(auto-fill,min(320px,90%))'}
              autoRows={'250px'}
              style={{width:'100%',overflow:'auto'}}
              gap={'10px'}
              justifyContent={'space-evenly'}
              children = {[5,6,7,8].map(item=>item.toString()).map(item=><CustomFile text={item} key={crypto.randomUUID()}/>)}
            />
              
          </CUI.TabPanel>
          <CUI.TabPanel  h="85vh">
          <CUI.Grid 
              templateColumns={'repeat(auto-fill,min(320px,90%))'}
              autoRows={'250px'}
              style={{width:'100%',overflow:'auto'}}
              gap={'10px'}
              justifyContent={'space-evenly'}
              children = {[9,10,11,12].map(item=>item.toString()).map(item=><CustomFile text={item} key={crypto.randomUUID()}/>)}
            />
          </CUI.TabPanel>
        </CUI.TabPanels>
        <CUI.Input 
          type="file" 
          display={'none'} 
          id="upload" 
          onChange={e=>{
            const files = [...e.target.files!];
            files.forEach(item=>{console.log(item);});
          }}
          multiple={true}
        />
       
          <CUI.Button
            leftIcon={<IonIcon style={{fontWeight:'700'}} name="add-outline"/>}
            bg='purple.500'
            style={{
              position:'absolute',
              bottom:'20px',
              right:'20px',
              fontWeight:'700',
              zIndex:'1'
            }} 
            _hover={{color:'#ffffff'}}
            children={<label htmlFor="upload" children={'Add'} />}
          />
          
    </CUI.Tabs>
  </CUI.Stack>
  </>
  );
}
export default Files;