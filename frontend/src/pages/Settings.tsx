import React from "react";
import IonIcon from "@reacticons/ionicons";
import * as CUI from "@chakra-ui/react";
import CustomSettingHeader from "../Components/CustomSettingHeader";
import * as CT from "./../CustomTypes/types";
const Settings: React.FC = () => {
  const [Width, SetWidth] = React.useState<number>(window.innerWidth);
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
  };
  const CM = CUI.useColorMode()
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
        <CUI.Box w={Width + "px"} h={"92vh"} >
          <CUI.Box
            padding={"5px"}
            display={"flex"}
            flexDirection={Width > 550 ? "row" : "column"}
            gap={"5px"}
            placeItems={"center"}
            w={"100%"}
          >
            <CUI.Image
              src={dp}
              maxW={"200px"}
              borderRadius={"10px"}
              filter={"drop-shadow(2px 6px 6px black)"}
            />
            <CUI.Card
              maxHeight={"200px"}
              minHeight={"200px"}
              
              borderRadius={"10px"}
              width={Width > 550 ? `calc(${Width}px - 200px)` : `calc(${Width}px - 20px)`}
              overflow={"hidden"}
            >
              <CUI.CardBody >
                <CUI.Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  placeItems={"center"}
                >
                  <CUI.InputGroup>
                    <CUI.InputLeftElement
                      transform={"scale(0.9)"}
                      borderRadius={"5px"}
                      bgColor={"purple.500"}
                      children={<IonIcon name="at" />}
                    />
                    <CUI.Input textAlign={'center'} value={email} type="email" readOnly={true} />
                  </CUI.InputGroup>
                  <CUI.InputGroup>
                    <CUI.InputLeftElement
                      transform={"scale(0.9)"}
                      borderRadius={"5px"}
                      bgColor={"purple.500"}
                      children={<IonIcon name="person" />}
                    />
                    <CUI.Input textAlign={'center'} value={userName} type="text" readOnly={true} />
                  </CUI.InputGroup>
                  <CUI.Tooltip colorScheme={"purple"} label={(diskSize/(2 * 2 ** 30)).toFixed(5) +'GB over 2GB is used' }>
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
            padding={'10px'}
            display={'flex'}
            flexDirection={'column'}
          >
            <CUI.InputGroup>
              <CUI.InputRightElement 
                children={
                  <IonIcon style={{fontSize:'xx-large'}} name={(CM.colorMode==='dark'?'sunny':'moon')}/>
                }
                onClick={CM.toggleColorMode}
              />
              <CUI.Input value={'toggle mode'}/>
            </CUI.InputGroup>
            <CUI.InputGroup marginY={'10px'}
            >
              <CUI.InputRightElement 
                bgColor={'red'}
                transform={'scale(0.9)'}
                borderRadius={'5px'}
                children={
                  <IonIcon style={{fontSize:'xx-large'}} name="trash"/>
                }
                onClick={()=>{console.log('trash')}}
              />
              <CUI.Input value={'delete account'}/>
            </CUI.InputGroup>
          </CUI.Box>
        </CUI.Box>
      </CUI.Stack>
    </>
  );
};
export default Settings;
