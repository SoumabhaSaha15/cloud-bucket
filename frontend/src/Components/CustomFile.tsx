import React from "react";
import * as CUI from "@chakra-ui/react";
import IonIcon from "@reacticons/ionicons";
import fileSvg from "./../assets/file.svg";
import * as CT from "./../CustomTypes/types" 
type Link = {
  link: string;
  onDelete:(name:string,tabNumber:number)=>void;
  tabNumber:number
};
const CustomFile: React.FC<Link> = (props: Link) => {
  const badge: string | undefined = props.link.split(".").pop();
  const file_name: string | undefined = props.link.split("/").pop();
  const extensions: string[] = ["jpg", "jpeg", "png", "svg"];
  const bg_image: string = extensions.includes(badge as string)
    ? props.link
    : fileSvg;
  const css_grid_area = "'file file' 'name button'";
  // const initialFocusRef = React.useRef({focus:()=>{}})
  const { isOpen, onToggle, onClose } = CUI.useDisclosure();
  const toast = CUI.useToast();
  return (
    <>
      <CUI.Box
        bg={"gray.300"}
        textAlign={"center"}
        position={"relative"}
        display={"grid"}
        overflow={"hidden"}
        borderRadius={"5px"}
        gridTemplateColumns={"calc(100% - 50px) 50px"}
        gridTemplateRows={"calc(100% - 50px) 50px"}
        gridTemplateAreas={css_grid_area}
        _hover={{
          fiter: "blur(1px)",
          filter: "brightness(110%)",
        }}
      >
        <CUI.Badge
          children={badge}
          position={"absolute"}
          top={"10px"}
          left={"10px"}
          color={"purple.500"}
          bg={"gray.300"}
          fontWeight={"900"}
        />
        <CUI.Box
          height={"80%"}
          backgroundPosition={"center center"}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"100%"}
          backgroundImage={'url("' + bg_image + '")'}
          gridArea={"file"}
          minHeight={"100%"}
          minWidth={"100%"}
          style={{
            backgroundColor: bg_image == fileSvg ? "#cbd5e0" : "#000000",
          }}
          _hover={{
            backgroundSize: bg_image == fileSvg ? "100%" : "95%",
          }}
        ></CUI.Box>
        <CUI.Box
          lineHeight={"50px"}
          children={
            <span
              children={file_name ? file_name : ""}
              style={{
                overflow: "hidden",
                maxHeight: "50px",
                display: "block",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontWeight: "900",
              }}
            />
          }
          gridArea={"name"}
          textOverflow={"ellipsis"}
          paddingX={"10px"}
          overflow={"hidden"}
          minHeight={"100%"}
          minWidth={"100%"}
          maxHeight={"100%"}
          maxWidth={"100%"}
        />

        <CUI.Popover
          isOpen={isOpen}
          onClose={onClose}
          placement="bottom"
          returnFocusOnClose={false}
          trigger="hover"
        >
          <CUI.PopoverTrigger>
            <CUI.Button
              gridArea={"button"}
              minHeight={"100%"}
              minWidth={"100%"}
              placeItems={"center"}
              _hover={{
                transform: "scale(0.8)",
              }}
              onClick={onToggle}
              bg={"gray.300"}
              children={
                <IonIcon
                  style={{
                    color: "#805ad5",
                    transform: "scale(1.5)",
                    fontWeight: "900",
                  }}
                  name="ellipsis-horizontal"
                />
              }
            />
          </CUI.PopoverTrigger>
          <CUI.Portal>
            <CUI.PopoverContent bg="gray.300">
              <CUI.PopoverArrow bg="purple.500" />
              <CUI.PopoverCloseButton />
              <CUI.PopoverHeader children={"Close"} />
              <CUI.PopoverFooter
                flexDirection={"column"}
                display={"flex"}
                gap={"2px"}
              >
                <CUI.Button
                  _hover={{ color: "#805ad5" }}
                  onClick={async () => {
                    const response :(CT.ErrorResponse|CT.deleteRouteResponse) = await fetch('/api/delete',{
                        method:'POST',
                        body:JSON.stringify({"fileName":file_name}),
                        headers:{
                          "Content-Type": "application/json",
                        }
                      }).then(res=>res.json());
                      if((response as CT.ErrorResponse)['err_msg']){
                        toast({
                          title: "error occured",
                          description: (response as CT.ErrorResponse)['err_msg'],
                          status: "error",
                          duration: 3000,
                          isClosable: true,
                          id: crypto.randomUUID(),
                        })
                      }else{
                        if((response as CT.deleteRouteResponse)['deleted']){
                          props.onDelete(props.link,props.tabNumber)
                          onToggle();
                        }else{
                          console.log(response);
                        }
                      }
                  }}
                  rightIcon={<IonIcon name="trash" />}
                  children={"delete"}
                  display={"flex"}
                  justifyContent={"space-between"}
                />
                <CUI.Button
                  _hover={{ color: "#805ad5" }}
                  onClick={() => {
                    window.open(props.link);
                  }}
                  rightIcon={<IonIcon name="link" />}
                  children={"preview"}
                  display={"flex"}
                  justifyContent={"space-between"}
                />
                <CUI.Button
                  _hover={{ color: "#805ad5" }}
                  onClick={()=>{
                    window.navigator.clipboard.writeText(props.link)
                    .then(()=>{
                      toast({
                        title: "copied to clipboard",
                        description: file_name,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        id: crypto.randomUUID(),
                      })
                    })
                    .catch(()=>{
                      toast({
                        title: "error occured",
                        description: 'cant copy filename',
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        id: crypto.randomUUID(),
                      })
                    })
                  }}
                  rightIcon={<IonIcon name="copy-outline" />}
                  children={"copy-link"}
                  display={"flex"}
                  justifyContent={"space-between"}
                />
                <CUI.Button
                  _hover={{ color: "#805ad5" }}
                  onClick={async () => {
                    const blob =  await fetch(props.link).then(res=>res.blob());
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = file_name??'';
                    link.click();
                    window.URL.revokeObjectURL(url);
                  }}
                  rightIcon={<IonIcon name="download" />}
                  children={"download"}
                  display={"flex"}
                  justifyContent={"space-between"}
                />
              </CUI.PopoverFooter>
            </CUI.PopoverContent>
          </CUI.Portal>
        </CUI.Popover>
      </CUI.Box>
    </>
  );
};
export default CustomFile;
