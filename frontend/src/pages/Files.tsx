import React from "react";
import IonIcon from "@reacticons/ionicons";
import * as CUI from "@chakra-ui/react";
import CustomFile from "../Components/CustomFile";
import CSP from "../Components/CustomSearchPanel";
import { useDropzone } from "react-dropzone";
import CustomHeader from "../Components/CustomHeader";
import * as CT from "./../CustomTypes/types";
import fileSvg from "./../assets/empty-bucket.svg";
const Files: React.FC = () => {
  const [dp, setDp] = React.useState<string>("https://bit.ly/sage-adebayo");
  // const [openSearchPanel,setOpenSearchPanel] = React.useState<"none"|"block">("none");
  const [tabs, setTabs] = React.useState<string[]>(["", ""]);
  const [tabPanels, setTabPanels] = React.useState<Array<Array<string>>>([
    [""],
    [""],
  ]);
  const { isOpen, onToggle, onClose } = CUI.useDisclosure();
  const MODAL = CUI.useDisclosure();
  window.addEventListener("load", async () => {
    const responseJson: CT.FilePageResponse | CT.ErrorResponse = await fetch(
      "/api" + location.pathname,
      { method: "post" }
    ).then((res) => res.json());

    if ((responseJson as CT.FilePageResponse)["dp"]) {
      console.clear();
      const jsonData = responseJson as CT.FilePageResponse;
      setDp(jsonData["dp"]);
      const extensions = [
        ...new Set(
          jsonData["files"]
            ?.map((item) => (item.split(".").pop()??"").toLocaleLowerCase())
        ),
      ];
      setTabs(extensions);
      const fileMap:CT.FilesMap[] = [];
      extensions.forEach((item) => {
        fileMap.push({fileType:item,fileList:jsonData.files.filter((it) => (it.split(".").pop()??"").toLocaleLowerCase() == item)})
      });
      setTabPanels(fileMap.map(it=>it.fileList));
    } else {
      alert((responseJson as CT.ErrorFileResponse).err_msg);
    }
  });

  const [Width, SetWidth] = React.useState<string>(
    window.innerWidth.toString() + "px"
  );
  const Debounce = (cb:()=>void,delay=1000)=>{
    let time_out:number;
    return ()=>{
      clearTimeout(time_out);
      time_out = setTimeout(cb,delay);
    }
  }
  const Resize_ViewPort = Debounce(()=>{
    SetWidth(window.innerWidth.toString() + "px");
  },2000);
  window.onresize = () => {
    Resize_ViewPort();
  };

  const toast = CUI.useToast();

  const onDrop = React.useCallback((acceptedFiles: Array<File>) => {
    const newFiles:Array<string> = [];
    acceptedFiles.forEach((item, index, array) => {
      try{
        if(item.name.startsWith(".")){
          throw new Error('invalid file name '+ item.name);
        }
        else{
          const data = new FormData();
          data.append("File", item);
          fetch("/api/upload", {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
            newFiles.push(data['name'])
              toast({
                title: "item added",
                description: data.name.split('/').pop(),
                status: "success",
                duration: 3000,
                isClosable: true,
                id: crypto.randomUUID(),
              });
            })
            .catch(err=>{
              toast({
                title: "Error",
                description: err.message,
                status: "warning",
                duration: 3000,
                isClosable: true,
                id: crypto.randomUUID(),
              });
            })
            .finally(() => {
              if (index == array.length - 1) {
                setTabPanels((prev)=>{
                  const fileMap:CT.FilesMap[] = [];
                  const  file_set = new Set([...prev.flat(1),...newFiles]);
                  const extension =[...new Set( [...file_set].map((item) => (item.split(".").pop()??"").toLocaleLowerCase()))] ;
                  setTabs(extension);
                  extension.forEach((item) => {
                    fileMap.push({fileType:item,fileList:[...file_set].filter((it) => (it.split(".").pop()??"").toLocaleLowerCase() == item)});
                  });
                  return fileMap.map(it=>it.fileList);
                });
              }
            });
        }
      }catch(e){
        toast({
          title:'Error',
          description:(e as {message:string})['message']??'invalid file name',
          duration:7000,
          status:'error',
          id:crypto.randomUUID(),
          isClosable:true,
        });
      }
      
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <CUI.Stack w={Width} overflow={"hidden"} gap={"0"}>
        <CUI.Flex
          height={"8vh"}
          minWidth={"100%"}
          padding={"10px"}
          boxSizing={"border-box"}
          bg={"purple.500"}
          gap={"0"}
          alignItems={"center"}
          children={<CustomHeader link={dp} />}
        />
        <CUI.Tabs variant="line" colorScheme="purple" defaultIndex={0}>
          <CUI.TabList
            height={"5vh"}
            children={
              (tabs.length>0)?
              tabs.map((item) => (
              <CUI.Tab
                key={crypto.randomUUID()}
                fontWeight={"700"}
                children={item}
              />
            )):('')
            }
          />

          <CUI.TabPanels
            h={"87vh"}
            overflow={"auto"}
            filter={isDragActive ? "blur(5px)" : "blur(0px)"}
            children={(tabPanels.length>0)?tabPanels.map((item,index) => (
              <CUI.TabPanel
                key={crypto.randomUUID()}
                children={
                  <CUI.Grid
                    templateColumns={"repeat(auto-fill,min(320px,90%))"}
                    autoRows={"250px"}
                    style={{ width: "100%" }}
                    gap={"10px"}
                    justifyContent={"space-evenly"}
                    children={item
                      .map((item1) => item1.toString())
                      .map((item2) => (
                        <CustomFile tabNumber={index} link={item2} key={crypto.randomUUID()} onDelete={(name,tabNumber)=>{
                          setTabPanels((prev)=> prev.map(item3=>item3.filter(item4=>(item4!==name))));
                          setTabPanels((prev)=> prev.filter(item3=>item3.length!==0));
                          {/* because of asynchronous rendering length 1 is outdated value*/}
                          setTabs((prev)=>(tabPanels[tabNumber].length==1)?prev.filter((_,idx)=>(idx!=tabNumber)):prev);
                        }}/>
                      ))}
                  />
                }
              />
            )):(<CUI.TabPanel textAlign={'center'} backgroundImage={'url("' + fileSvg + '")'} backgroundPosition={"center center"} backgroundRepeat={"no-repeat"} backgroundSize={"30%"} fontSize={'24px'} h={"87vh"} children={'no files uploaded'}/>)}
          />
          






          <CUI.Modal isOpen={MODAL.isOpen} onClose={MODAL.onClose}>
            <CUI.ModalOverlay />
            <CUI.ModalContent>
            <CUI.ModalHeader>{'Search panel'}</CUI.ModalHeader>
            <CUI.ModalCloseButton />
            <CUI.ModalBody minHeight={'65vh'} marginY={'10px'} >
              <CSP links={tabPanels.flat(1)}></CSP>
            </CUI.ModalBody>
            <CUI.ModalFooter>
              <CUI.Button children={'Close'} colorScheme='purple' mr={3} onClick={MODAL.onClose}/>
            </CUI.ModalFooter>
          </CUI.ModalContent>
      </CUI.Modal>






          <CUI.Button
            leftIcon={<IonIcon style={{ fontWeight: "700" }} name="search" />}
            bg="purple.500"
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              fontWeight: "700",
              zIndex: "1",
            }}
            children={"search"}
            _hover={{ color: "#ffffff" }}
            onClick={MODAL.onOpen}
          />
          <CUI.Popover
            isOpen={isOpen}
            onClose={onClose}
            placement="bottom"
            returnFocusOnClose={false}
          >
            <CUI.PopoverTrigger>
              <CUI.Button
                leftIcon={
                  <IonIcon style={{ fontWeight: "700" }} name="add-outline" />
                }
                bg="purple.500"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  fontWeight: "700",
                  zIndex: "1",
                }}
                onClick={onToggle}
                children={"add"}
                _hover={{ color: "#ffffff" }}
              />
            </CUI.PopoverTrigger>
            <CUI.Portal>
              <CUI.PopoverContent bg={'gray.400'} borderRadius={'10px'}>
                <CUI.PopoverArrow bg={'purple.500'} />
                <CUI.PopoverCloseButton />
                <CUI.PopoverHeader children={"Close"} />
                <CUI.PopoverFooter>
                  <CUI.Box
                    {...getRootProps()}
                    minH={"200px"}
                    minW={"200px"}
                    bg={isDragActive ? "green.300" : "gray.300"}
                    textAlign={"center"}
                    placeItems={"center"}
                    border={"2px dashed #805ad5"}
                    display={"grid"}
                    borderRadius={"10px"}
                  >
                    {"drop files here"}
                    <CUI.Input
                      {...getInputProps()}
                      id="upload"
                      size={""}
                      display={"none"}
                    />
                  </CUI.Box>
                </CUI.PopoverFooter>
              </CUI.PopoverContent>
            </CUI.Portal>
          </CUI.Popover>
        </CUI.Tabs>
      </CUI.Stack>
    </>
  );
};
export default Files;
