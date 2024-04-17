import React from "react";
import IonIcon from '@reacticons/ionicons';
import * as CUI from  "@chakra-ui/react";
import CustomFile from "../Components/CustomFile";
import {useDropzone} from 'react-dropzone'
import CustomHeader from "../Components/CustomHeader";
const Files:React.FC = () => {

  const [dp,setDp] = React.useState<string>('https://bit.ly/sage-adebayo');
  const [tabs,setTabs] = React.useState<string[]>(['','']);
  const [tabPanels,setTabPanels] = React.useState<Array<Array<string>>>([[''],['']]);
  window.addEventListener('load', async ()=>{
    const responseJson = await fetch('/api'+location.pathname,{method:'post'}).then(res=>res.json());
    if(responseJson['dp']){
      console.clear();
      setDp(responseJson['dp']);
      let fls = responseJson['files']?.map(item=>item.split('.')[1]);
      setTabs([...(new Set(fls))]);
      let acc:Array<Array<string>> = [];
      [...(new Set(fls))].forEach((item)=>{
        let str_arr:string[] = responseJson['files']?.filter(it=>{
            return  it.split('.')[1]==item
        });
        acc.push(str_arr);
      });
      setTabPanels(acc);
    }
  });
  
  const [Width,SetWidth] = React.useState<string>(window.innerWidth.toString()+'px');
  window.onresize=()=>{
    SetWidth(window.innerWidth.toString()+'px');
  }
  const toast = CUI.useToast(); 
  const onDrop = React.useCallback((acceptedFiles:Array<File>)=>{
    console.log(acceptedFiles);
    acceptedFiles.forEach(item=>{
      toast({
        title: 'item added',
        description: item.name,
        status: 'success',
        duration: 3000,
        isClosable: true,
        id:crypto.randomUUID()
      });
    })
  },[]);
  const {getRootProps,getInputProps,isDragActive} = useDropzone({onDrop});
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
      children={<CustomHeader link={dp}/>}
    />
    <CUI.Tabs  
        variant='line'
        colorScheme="purple"
    >
        <CUI.TabList height={'5vh'}
          children = {tabs.map(item => (<CUI.Tab key={crypto.randomUUID()} fontWeight={'700'} children={item}/>))}
        />

        <CUI.TabPanels 
          h={'87vh'} 
          overflow={'auto'}
          {...getRootProps()}
          onClick={e=>{
            e.preventDefault();
          }}
          
          filter={isDragActive?"blur(5px)":"blur(0px)"}
          children={
            tabPanels.map(item=>(
              <CUI.TabPanel
                key={crypto.randomUUID()}
                children={
                  <CUI.Grid 
                  templateColumns={'repeat(auto-fill,min(320px,90%))'}
                  autoRows={'250px'}
                  style={{width:'100%'}}
                  gap={'10px'}
                  justifyContent={'space-evenly'}
                  children = {item.map(it=>it.toString()).map((it1)=><CustomFile link={it1} key={crypto.randomUUID()} />)}
                />
                }
              />
              
            ))
          }
        />
          
          
        
        <CUI.Input 
          {...getInputProps()}
          id="upload"
          size={''}
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