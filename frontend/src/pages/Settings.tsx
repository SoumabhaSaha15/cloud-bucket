import React from "react";
import IonIcon from "@reacticons/ionicons";
import * as CUI from "@chakra-ui/react";
import CustomSettingHeader from "../Components/CustomSettingHeader";
import * as CT from "./../CustomTypes/types";
const Settings: React.FC = () => {
  const [Width, SetWidth] = React.useState<number>(window.innerWidth);
  const [password, setPassword] = React.useState<string>("");
  const toast = CUI.useToast();
  const Debounce = (cb: () => void, delay = 1000) => {
    let time_out: number;
    return () => {
      clearTimeout(time_out);
      time_out = setTimeout(cb, delay);
    };
  };
  const Resize_ViewPort = Debounce(() => {
    SetWidth(window.innerWidth);
  }, 2000);
  window.onresize = () => {
    Resize_ViewPort();
  };
  const [dp, steDp] = React.useState<string>(
    "http://localhost:5173/src/assets/react.svg"
  );
  const [email, setEmail] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [diskSize, setDiskSize] = React.useState<number>(0);
  const MODAL = CUI.useDisclosure();
  window.onload = async () => {
    const data: CT.SettingsPageReponse | CT.ErrorFileResponse = await fetch(
      "/api" + window.location.pathname,
      { method: "POST" }
    ).then((res) => res.json());
    const SPR = data as CT.SettingsPageReponse;
    steDp(SPR.DP);
    setEmail(SPR.Email);
    setUserName(SPR.UserName);
    setDiskSize(SPR.diskSize);
    console.clear();
  };
  const CM = CUI.useColorMode();
  return (
    <>
      <CUI.Stack w={Width + "px"} overflow={"hidden"} gap={"0"}>
        <CUI.Flex
          height={"8vh"}
          minWidth={"100%"}
          padding={"10px"}
          boxSizing={"border-box"}
          bg={"purple.500"}
          gap={"0"}
          alignItems={"center"}
          children={<CustomSettingHeader />}
        />
        <CUI.Box w={Width + "px"} h={"92vh"}>
          <CUI.Box
            padding={"5px"}
            display={"flex"}
            flexDirection={Width > 550 ? "row" : "column"}
            gap={"5px"}
            placeItems={"center"}
            w={"100%"}
          >
            <CUI.Image src={dp} maxW={"200px"} borderRadius={"10px"} />
            <CUI.Card
              maxHeight={"200px"}
              minHeight={Width > 550 ? "200px" : "unset"}
              bgColor={CM.colorMode == "dark" ? "gray.700" : "gray.300"}
              borderRadius={"10px"}
              width={
                Width > 550
                  ? `calc(${Width}px - 200px)`
                  : `calc(${Width}px - 20px)`
              }
              overflow={"hidden"}
            >
              <CUI.CardBody>
                <CUI.Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  placeItems={"center"}
                  height={"fit-content"}
                >
                  <CUI.InputGroup>
                    <CUI.InputLeftElement
                      transform={"scale(0.9)"}
                      borderRadius={"5px"}
                      bgColor={"purple.500"}
                      children={<IonIcon name="at" />}
                    />
                    <CUI.Input
                      textAlign={"center"}
                      value={email}
                      type="email"
                      readOnly={true}
                    />
                  </CUI.InputGroup>
                  <CUI.InputGroup>
                    <CUI.InputLeftElement
                      transform={"scale(0.9)"}
                      borderRadius={"5px"}
                      bgColor={"purple.500"}
                      children={<IonIcon name="person" />}
                    />
                    <CUI.Input
                      textAlign={"center"}
                      value={userName}
                      type="text"
                      readOnly={true}
                    />
                  </CUI.InputGroup>
                  <CUI.Tooltip
                    colorScheme={"purple"}
                    label={
                      (diskSize / (2 * 2 ** 30)).toFixed(5) +
                      "GB over 2GB is used"
                    }
                  >
                    <CUI.Progress
                      colorScheme={"purple"}
                      value={diskSize}
                      max={2 * 2 ** 30}
                      height={"10px"}
                      w={"100%"}
                      marginY={"10px"}
                      borderRadius={"10px"}
                    />
                  </CUI.Tooltip>
                </CUI.Box>
              </CUI.CardBody>
            </CUI.Card>
          </CUI.Box>
          <CUI.Box
            padding={"10px"}
            justifyContent={"center"}
            placeItems={"center"}
            display={"flex"}
            gap={"10px"}
            marginX={"5px"}
            borderRadius={"10px"}
            flexDirection={Width > 550 ? "row" : "column"}
            bgColor={CM.colorMode == "dark" ? "gray.700" : "gray.300"}
          >
            <CUI.Modal isOpen={MODAL.isOpen} onClose={MODAL.onClose}>
              <CUI.ModalOverlay />
              <CUI.ModalContent>
                <CUI.ModalHeader>{"Delete file"}</CUI.ModalHeader>
                <CUI.ModalCloseButton />
                <CUI.ModalBody>
                  {"Do you want to delete your account?"}
                  <CUI.InputGroup>
                    <CUI.InputLeftElement
                      children={<IonIcon name="lock-closed" />}
                    />
                    <CUI.Input
                      placeholder="enter password to delete"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                    />
                  </CUI.InputGroup>
                </CUI.ModalBody>
                <CUI.ModalFooter>
                  <CUI.Button
                    children={"Close"}
                    colorScheme="purple"
                    mr={3}
                    onClick={MODAL.onClose}
                  />
                  <CUI.Button
                    colorScheme="red"
                    children={"delete permanently"}
                    onClick={async ()=>{
                      const response = await fetch('/api/delete-account',
                        {
                          method:'post',
                          body:JSON.stringify({UserName:userName,Password:password,Email:email}),
                          headers:{
                            'Content-Type':'application/json'
                          }
                        }
                      ).then(res=>res.text());
                      const json_response = JSON.parse(response);
                      if(!json_response['err_msg']){
                        window.location.pathname=json_response['redirect'];
                      }else{
                        toast({
                          title:'response error',
                          description:json_response['err_msg']??'error in data',
                          status:'error',
                          id:crypto.randomUUID(),
                          isClosable:true,
                          duration:8000
                        });
                      }
                    }}
                  />
                </CUI.ModalFooter>
              </CUI.ModalContent>
            </CUI.Modal>
            <CUI.InputGroup>
              <CUI.InputRightElement
                children={
                  <IonIcon
                    style={{ fontSize: "xx-large" }}
                    name={CM.colorMode === "dark" ? "sunny" : "moon"}
                  />
                }
                onClick={CM.toggleColorMode}
              />
              <CUI.Input value={"toggle mode"} />
            </CUI.InputGroup>
            <CUI.InputGroup marginY={"10px"}>
              <CUI.InputRightElement
                bgColor={"red"}
                transform={"scale(0.9)"}
                borderRadius={"5px"}
                children={
                  <IonIcon style={{ fontSize: "xx-large" }} name="trash" />
                }
                onClick={MODAL.onOpen}
              />
              <CUI.Input value={"delete account"} />
            </CUI.InputGroup>
          </CUI.Box>
        </CUI.Box>
      </CUI.Stack>
    </>
  );
};
export default Settings;
