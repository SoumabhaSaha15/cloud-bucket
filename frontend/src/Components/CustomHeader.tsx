import React from "react";
import * as CUI from "@chakra-ui/react";
type UserDP = {
  link: string;
};
const CustomHeader: React.FC<UserDP> = (props: UserDP) => {
  return (
    <>
      <CUI.Avatar
        src={"./../src/assets/react.svg"}
        style={{ maxHeight: "100%" }}
        maxHeight={"6vh"}
        maxWidth={"6vh"}
        aspectRatio={"1/1"}
      />
      <CUI.Spacer />
      <CUI.HStack spacing={"10px"} alignItems={"center"} position={'relative'}>
        <CUI.Tooltip label={"account-settings"} bgColor={'purple.500'} position={'absolute'} zIndex={2} top={'10px'} right={'10px'}>
          <CUI.Avatar
            maxHeight={"6vh"}
            maxWidth={"6vh"}
            aspectRatio={"1/1"}
            src={props.link}
            onClick={() => {window.location.pathname = "/settings";}}
          />
        </CUI.Tooltip>
      </CUI.HStack>
    </>
  );
};
export default CustomHeader;
