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
  const CM = CUI.useColorMode();
  const badge: string | undefined = props.link.split(".").pop();
  const file_name: string | undefined = props.link.split("/").pop();
  const extensions: string[] = ["jpg", "jpeg", "png", "svg","webp","gif"];
  const bg_image: string = extensions.includes(badge as string)
    ? props.link
    : fileSvg;
  const css_grid_area = "'file file' 'name button'";
  const { isOpen, onToggle, onClose } = CUI.useDisclosure();
  const MODAL = CUI.useDisclosure()
  const toast = CUI.useToast();
  const [blobData,setBlobData] = React.useState<Blob|null>(null);
  return (
    <>
      <CUI.Box
        textAlign={"center"}
        position={"relative"}
        display={"grid"}
        overflow={"hidden"}
        borderRadius={"5px"}
        gridTemplateColumns={"calc(100% - 50px) 50px"}
        gridTemplateRows={"calc(100% - 50px) 50px"}
        gridTemplateAreas={css_grid_area}
        bgColor={CM.colorMode=='dark'?'gray.700':'gray.400'}
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
            transition:'all 0.25s ease-in-out'
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
                fontWeight: "700",
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

      <CUI.Modal isOpen={MODAL.isOpen} onClose={MODAL.onClose}>
        <CUI.ModalOverlay />
        <CUI.ModalContent>
          <CUI.ModalHeader>{'Delete file'}</CUI.ModalHeader>
          <CUI.ModalCloseButton />
          <CUI.ModalBody>
            {'Do you want to delete '+file_name+' ?'}
          </CUI.ModalBody>
          <CUI.ModalFooter>
            <CUI.Button children={'Close'} colorScheme='purple' mr={3} onClick={MODAL.onClose}/>
              
            <CUI.Button 
              colorScheme="red"
              children = {'delete permanently'}
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
                      toast({
                        title:'deleted',
                        isClosable:true,
                        duration:5000,
                        status:'error',
                        id:crypto.randomUUID(),
                        description:file_name
                      })
                    }else{
                      console.log(response);
                    }
                  }
              }}
            />
          </CUI.ModalFooter>
        </CUI.ModalContent>
      </CUI.Modal>


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
              transform={'scale(0.9)'}
              _hover={{
                transform: "scale(0.8)",
              }}
              colorScheme={CM.colorMode}
              onClick={async ()=>{
                onToggle();
                (!blobData)?setBlobData(await fetch(props.link).then(res=>res.blob())):(()=>{})();
              }}
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
            <CUI.PopoverContent >
              <CUI.PopoverArrow />
              <CUI.PopoverCloseButton />
              <CUI.PopoverHeader children={"Close"} />
              <CUI.PopoverFooter
                flexDirection={"column"}
                display={"flex"}
                gap={"2px"}
              >

                <CUI.Button
                  colorScheme="purple"
                  _hover={{ transform:"scale(0.9)" }}
                  children={"type : " + (blobData as Blob)?.type??'' }
                  disabled={true}
                  display={"flex"}
                  justifyContent={"space-between"}
                />
                <CUI.Button
                  colorScheme="purple"
                  _hover={{ transform:"scale(0.9)" }}
                  children={"size : "+((blobData as Blob)?.size??'unknown') +'bytes' }
                  disabled={true}
                  display={"flex"}
                  justifyContent={"space-between"}
                />

                <CUI.Button
                  colorScheme="purple"
                  _hover={{ transform:"scale(0.9)" }}
                  onClick={MODAL.onOpen}
                  rightIcon={<IonIcon name="trash" />}
                  children={"delete"}
                  display={"flex"}
                  justifyContent={"space-between"}
                />
                <CUI.Button
                  colorScheme="purple"
                  _hover={{ transform:"scale(0.9)" }}
                  onClick={() => {
                    window.open(props.link);
                  }}
                  rightIcon={<IonIcon name="link" />}
                  children={"preview"}
                  display={"flex"}
                  justifyContent={"space-between"}
                />
                <CUI.Button
                  _hover={{ transform:"scale(0.9)" }}
                  colorScheme="purple"
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
                  colorScheme="purple"
                  _hover={{ transform:"scale(0.9)" }}
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
