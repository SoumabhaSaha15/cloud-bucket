import React from "react";
import * as CUI from '@chakra-ui/react'
import IonIcon from '@reacticons/ionicons';
import fileSvg from './../assets/file.svg'
type Link ={
  link:string
};
const CustomFile:React.FC<Link>=(props:Link)=> {
  // console.log(props)
  const badge:string|undefined = props.link.split('.').pop();
  const file_name:string|undefined = props.link.split('/').pop();
  const extensions:string[] = ['jpg','jpeg','png','svg']; 
  const bg_image:string = (extensions.includes(badge as string))?(props.link):(fileSvg);
  const css_grid_area = "'file file' 'name button'";
  return (
  <> 
    <CUI.Box
      bg={'gray.300'}
      textAlign={'center'}
      position={'relative'}
      display={'grid'}
      overflow={'hidden'}
      borderRadius={'5px'}
      gridTemplateColumns={'calc(100% - 50px) 50px'}
      gridTemplateRows={'calc(100% - 50px) 50px'}
      gridTemplateAreas={css_grid_area}
      _hover={{
        fiter:'blur(1px)',
        filter:"brightness(110%)"
      }}
    >
      <CUI.Badge 
        children={badge}
        position={'absolute'}
        top={'10px'}
        left={'10px'}
        color={'purple.500'}
        bg={'gray.300'}
        fontWeight={'900'}
      />
      <CUI.Box
        height={'80%'}
        backgroundPosition={'center center'}
        backgroundRepeat={'no-repeat'}
        backgroundSize={'100%'}
        backgroundImage={'url("'+bg_image+'")'}
        gridArea={'file'}
        minHeight={'100%'}
        minWidth={'100%'}
        style={{backgroundColor:(bg_image==fileSvg)?('#cbd5e0'):('#000000')}}
        _hover={{
          backgroundSize:(bg_image==fileSvg)?('100%'):('95%')
        }}
      ></CUI.Box>
      <CUI.Box
        lineHeight={'50px'}
        children={<span
          children={(file_name)?(file_name):('')}
          style={{
            overflow:"hidden",
            maxHeight:'50px',
            display:'block',
            whiteSpace:'nowrap',
            textOverflow:'ellipsis',
            fontWeight:'900'
          }}
        />}
        gridArea={'name'}
        textOverflow={'ellipsis'}
        paddingX={'10px'}
        overflow={'hidden'}
        minHeight={'100%'}
        minWidth={'100%'}
        maxHeight={'100%'}
        maxWidth={'100%'}
      />
      <CUI.Button
        gridArea={'button'}
        minHeight={'100%'}
        minWidth={'100%'}
        placeItems={'center'}
        _hover={{
          transform:'scale(0.8)'
        }}
        bg={'gray.300'}
        children={
          <IonIcon
          style={{
            color:'#805ad5',
            transform:'scale(1.5)',
            fontWeight:'900'
          }} 
          name="ellipsis-horizontal"
          />
        }
      />
    </CUI.Box>
  </>);
}
export default CustomFile;