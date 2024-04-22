import React from "react";
import IonIcon from "@reacticons/ionicons";
import * as CUI from "@chakra-ui/react";
import CustomFile from "../Components/CustomFile";
import { useDropzone } from "react-dropzone";
import CustomHeader from "../Components/CustomHeader";
import * as CT from "./../CustomTypes/types";
const Files: React.FC = () => {
  const [dp, setDp] = React.useState<string>("https://bit.ly/sage-adebayo");
  const [tabs, setTabs] = React.useState<string[]>(["", ""]);
  const [tabPanels, setTabPanels] = React.useState<Array<Array<string>>>([
    [""],
    [""],
  ]);
  // const root_drop_panel_id = crypto.randomUUID();
  const { isOpen, onToggle, onClose } = CUI.useDisclosure();
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
            ?.map((item) => item.split(".")[1])
            .map((item) => item.toLocaleLowerCase())
        ),
      ];
      setTabs(extensions);
      const fileMap = new Map<string, string[]>();
      extensions.forEach((item) => {
        fileMap.set(
          item,
          jsonData.files.filter(
            (it) => it.split(".")[1].toLocaleLowerCase() == item
          )
        );
      });
      setTabPanels([...fileMap.values()]);
    } else {
      alert((responseJson as CT.ErrorFileResponse).err_msg);
    }
  });

  const [Width, SetWidth] = React.useState<string>(
    window.innerWidth.toString() + "px"
  );
  window.onresize = () => {
    SetWidth(window.innerWidth.toString() + "px");
  };

  const toast = CUI.useToast();

  const onDrop = React.useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.forEach((item, index, array) => {
      const data = new FormData();
      data.append("File", item);
      fetch("/api/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          toast({
            title: "item added",
            description: data.name,
            status: "success",
            duration: 3000,
            isClosable: true,
            id: crypto.randomUUID(),
          });
        })
        .finally(() => {
          if (index == array.length - 1) {
            window.location.reload();
          }
        });
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
        <CUI.Tabs variant="line" colorScheme="purple">
          <CUI.TabList
            height={"5vh"}
            children={tabs.map((item) => (
              <CUI.Tab
                key={crypto.randomUUID()}
                fontWeight={"700"}
                children={item}
              />
            ))}
          />

          <CUI.TabPanels
            h={"87vh"}
            overflow={"auto"}
            filter={isDragActive ? "blur(5px)" : "blur(0px)"}
            children={tabPanels.map((item) => (
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
                        <CustomFile link={item2} key={crypto.randomUUID()} onDelete={(name)=>{
                          setTabPanels((prev)=>{
                            return prev.map(item3=>item3.filter(item4=>(item4!==name)))
                          })
                        }}/>
                      ))}
                  />
                }
              />
            ))}
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
