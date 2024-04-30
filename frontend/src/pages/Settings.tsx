import React from "react";
// import IonIcon from "@reacticons/ionicons";
import * as CUI from "@chakra-ui/react";
// import CustomFile from "../Components/CustomFile";
// import CSP from "../Components/CustomSearchPanel";
// import { useDropzone } from "react-dropzone";
import CustomSettingHeader from "../Components/CustomSettingHeader";
import * as CT from "./../CustomTypes/types";
// import fileSvg from "./../assets/empty-bucket.svg";
const Settings: React.FC = () => {
  const [Width, SetWidth] = React.useState<string>(
    window.innerWidth.toString() + "px"
  );
  const Debounce = (cb: () => void, delay = 1000) => {
    let time_out: number;
    return () => {
      clearTimeout(time_out);
      time_out = setTimeout(cb, delay);
    };
  };
  const Resize_ViewPort = Debounce(() => {
    SetWidth(window.innerWidth.toString() + "px");
  }, 2000);
  window.onresize = () => {
    Resize_ViewPort();
  };
  const setDirection = (item: string) => {
    if (parseInt(item.split("px").shift() ?? "") >= 550) {
      return true;
    } else {
      return false;
    }
  };
  const getWidth = (item: string) => parseInt(item.split("px").shift() ?? "");
  const [dp, steDp] = React.useState<string>(
    "http://localhost:5173/src/assets/react.svg"
  );
  const [email, setEmail] = React.useState<string>("");
  window.onload = async () => {
    const data: CT.SettingsPageReponse | CT.ErrorFileResponse = await fetch(
      "/api" + window.location.pathname,
      { method: "POST" }
    ).then((res) => res.json());
    const SPR = data as CT.SettingsPageReponse;
    steDp(SPR.DP);
    setEmail(SPR.Email);
  };
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
          children={<CustomSettingHeader />}
        />
        <CUI.Box w={Width} h={"92vh"}>
          <CUI.Box
            padding={"5px"}
            display={"flex"}
            flexDirection={setDirection(Width) ? "row" : "column"}
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
              padding={'10px'}
              borderRadius={'10px'}
              width={
                setDirection(Width)
                  ? `calc(${getWidth(Width)}px - 200px)`
                  : Width
              }
              overflow={"hidden"}
            >
              <CUI.CardHeader
                children={
                  <CUI.Badge children={"User Details"} bgColor={"purple.300"} />
                }
                bgColor={'gray.300'}
              />
              <CUI.CardBody>
                <CUI.Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <CUI.Badge children={"Email"} bgColor={"gray.300"} />
                  <CUI.Input
                    value={email}
                    readOnly={true}
                    _focus={{
                      outlineColor: "#00000000 !important",
                      borderColor: "#00000000 !important",
                    }}
                    textAlign={"center"}
                    textTransform={'uppercase'}
                    _hover={{ outlineColor: "#00000000 !important" }}
                  />
                </CUI.Box>
                <CUI.Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <CUI.Badge children={"User Name"} bgColor={"gray.300"} />
                  <CUI.Input
                    value={email}
                    readOnly={true}
                    _focus={{
                      outlineColor: "#00000000 !important",
                      borderColor: "#00000000 !important",
                    }}
                    textAlign={"center"}
                    textTransform={'uppercase'}
                    _hover={{ outlineColor: "#00000000 !important" }}
                  />
                </CUI.Box>
              </CUI.CardBody>
            </CUI.Card>
          </CUI.Box>
        </CUI.Box>
      </CUI.Stack>
    </>
  );
};
export default Settings;
