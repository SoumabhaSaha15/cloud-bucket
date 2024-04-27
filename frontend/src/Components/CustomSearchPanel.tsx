import React from "react";
import IonIcon from "@reacticons/ionicons";
import * as CUI from "@chakra-ui/react";
type Files = {
  display: "none"|"block"
  links: string[];
};
type NameAndLink = {
  name:string;
  link:string;
}
const CustomSearchPanel:React.FC<Files>=(props:Files)=>{
  const toast = CUI.useToast();
  const names:Array<NameAndLink> = props.links.map(item=>({name:item.split("/").pop()??"",link:item}));
  const [matched,setMatched]  = React.useState<NameAndLink[]>([]);
  return(
  <>
  <CUI.Box 
    style={{display:props.display}} 
    width={'80%'}
    borderRadius={'10px'}
    bg={'gray.300'}
    position={'absolute'}
    top={'50px'}
    left={'10%'}
  >
    <CUI.InputGroup>
      <CUI.InputLeftElement children={<IonIcon name="search"/>}/>
      <CUI.Input type="text" placeholder="search files" onKeyDown={(e)=>{
        if(e.key == "Enter"){
          if(e.currentTarget.value!="")
            setMatched(names.filter(item=>(item.name??"").toLocaleLowerCase().includes(e.currentTarget.value.toLocaleLowerCase())));
          else
            setMatched([]);
        }
      }}/>
    </CUI.InputGroup>
    <CUI.Box
      maxHeight={'60vh'}
      overflow={'auto'}
      padding={'4px'} 
      children={matched.map(item=>(<CUI.Box
        key={crypto.randomUUID()}
        padding={'10px'}
        marginY={'4px'} 
        _hover={{scale:"0.9",backgroundColor:"#805ad580"}}
        borderRadius={"10px"}
        children={item.name}
        onClick={()=>{
          toast({
            title:"copied link",
            duration:5000,
            status:"success",
            description:item.name,
            isClosable:true,
            id:crypto.randomUUID()
          })
          window.navigator.clipboard.writeText(item.link??"");
        }}
      />))}
    />
  </CUI.Box>
  </>
  );
}
export default CustomSearchPanel;