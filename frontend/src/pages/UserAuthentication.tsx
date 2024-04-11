import React from "react";
import * as CUI from "@chakra-ui/react";
import IonIcon from '@reacticons/ionicons';
import * as CustomTypes from '../CustomTypes/types'
const UserAuthentication:React.FC<React.PropsWithChildren> = () => {
  const bgColor='#808080';
  const [form_type,set_form_type] =  React.useState<{formName:CustomTypes.SignUpOrLogin,
  spanText:CustomTypes.AuthFormSpanText,display:('flex'|'none'),height:('450px'|'225px'),
  required:boolean}>({
    formName:'SignUp',
    spanText:'Already have an account ',
    display:'flex',
    height:'450px',
    required:true
  });
  const invert_form_name = (str:CustomTypes.SignUpOrLogin):CustomTypes.SignUpOrLogin=>{
    return (str == 'LogIn')?('SignUp'):('LogIn');
  }
  const invert_span_text = (str:CustomTypes.AuthFormSpanText):CustomTypes.AuthFormSpanText=>{
    return (str == 'Already have an account ')?("Don't have an account "):("Already have an account ");
  }
  const [fieldName,setFieldName] = React.useState<CustomTypes.SignUpOnlyFiledNames>({
    ProfilePictureName:'ProfilePicture',
    UserName:'UserName'
  });
  const [DP,set_DP] = React.useState<string>('./../src/assets/user.svg');
  const [passwordVisibility,setPasswordVisibility] = React.useState<CustomTypes.PASSWORD_VISIBLE_OR_NOT>({IconName:'eye-sharp',InputType:'password'});
  
  return (
  <form 
    style={{
      width:'min(400px,90vw)',
      backgroundColor:'white',
      height:form_type.height,
      borderRadius:'10px',
      padding:'10px',
      boxShadow:'2px 2px 4px #808080, -2px -2px 4px #808080, -2px 2px 4px #808080, 2px -2px 4px #808080'
    }} 
    name={form_type.formName} 
    onSubmit={async (e)=>{
      try{
        e.preventDefault();
        let data = await fetch('/api/'+location.pathname, {method: 'POST', body:(new FormData(e.currentTarget))});
        data = await data.json();
        console.log(data);
      }catch(e){
        window.alert(e);
      }
    }}>
    <CUI.Stack style={{
      alignItems:'center'
    }}>
      <CUI.FormLabel htmlFor="DP" >
        <CUI.Tooltip 
        fontSize='md'
        label={'profile picture'}
        color="black"
        borderRadius={'10px'}
        bgColor={bgColor}
        >
          <CUI.Image 
          src={DP} 
          style={{
            maxHeight:'150px',
            maxWidth:'150px',
            height:'150px',
            aspectRatio:'1/1',
            display:form_type.display
          }}
          />
        </CUI.Tooltip>
      </CUI.FormLabel>
      <CUI.InputGroup size='lg' style={{display:form_type.display}}>
        <CUI.InputLeftAddon 
          children={<IonIcon 
            style={{
              fontSize:'x-large',
              fontWeight:'900'
            }} 
            name="person-circle-outline"
          />
          }
          bg="purple.500" 
          style={{
            borderColor:bgColor,
          }}
        />
        <CUI.Input 
        type="text"
        placeholder="Your name" 
        variant='outline' 
        style={{
          borderColor:bgColor,
        }}
        name={fieldName.UserName}
        isRequired={form_type.required} 
        pattern="^[a-zA-Z ]{2,}$"
        />
      </CUI.InputGroup>
      <CUI.InputGroup size='lg'>
        <CUI.InputLeftAddon 
          children={<IonIcon 
            name="mail-open-outline" 
            style={{
              fontSize:'x-large',
              fontWeight:'900'
            }}
          />}
          bg="purple.500" 
          style={{
            borderColor:bgColor
          }}
        />
        <CUI.Input 
        type="email"
        placeholder="enter email" 
        variant='outline' 
        required 
        style={{
          borderColor:bgColor
        }}
        name={'Email'}
        />
      </CUI.InputGroup>
      <CUI.InputGroup size='lg'>
        <CUI.InputLeftAddon 
          children={<IonIcon 
              name="lock-closed"
              style={{
                fontSize:'x-large',
                fontWeight:'900'
              }}
            />} 
          bg="purple.500"
          style={{
            borderColor:bgColor,
          }} 
        />
        <CUI.Input 
        placeholder="enter password" 
        type={passwordVisibility.InputType}
        variant='outline'
        name={'Password'} 
        required 
        pattern="^[a-zA-Z0-9!@#$%^&*]{8,16}$"
        style={{
          borderColor:bgColor
        }} 
        />
        <CUI.InputRightElement 
        children={<IonIcon name={passwordVisibility.IconName} />}  
        onClick={()=>{
          setPasswordVisibility(v=>(
            (v.IconName==='eye-sharp' && v.InputType==='password')?
              ({IconName:'eye-off-sharp',InputType:'text'}):
              ({IconName:'eye-sharp',InputType:'password'})));
        }}/>
      </CUI.InputGroup>
      <CUI.Input 
      type="file" 
      accept=".png,.jpg" 
      required={form_type.required} 
      name={fieldName.ProfilePictureName}
      style={{
        display:'none'
      }} 
      id='DP' 
      onChange={(e)=>{
        const reader = new FileReader();
        reader.onload = (re) => {
          set_DP((value)=>(re.target?.result)?(re.target?.result.toString()):(value));
        };
        try{
          reader.readAsDataURL((e.target?.files as FileList)[0]);
        }catch(err){
          console.dir(err);
        }
      }}/>
      <span style={{
          fontWeight:600
        }}>
        {form_type.spanText} 
        <a 
        style={{
          color:'blue',
          cursor:'pointer'
        }} 
        onClick={(e)=>{
          e.preventDefault();
          set_form_type(v=>(v.display=='flex')?
            ({...v,display:'none',formName:invert_form_name(v.formName),spanText:invert_span_text(v.spanText),height:'225px',required:false,}):
            ({...v,display:'flex',formName:invert_form_name(v.formName),spanText:invert_span_text(v.spanText),height:'450px',required:true,})
          );
          setFieldName(v=>(v.ProfilePictureName==='ProfilePicture' && v.UserName==='UserName')?
            ({ProfilePictureName:"",UserName:""}):
            ({ProfilePictureName:"ProfilePicture",UserName:"UserName"})
          );
        }}>{invert_form_name(form_type.formName)}</a>
      </span>
      <CUI.Button
        bg={"purple.500"} 
        type="submit" 
        style={{
          width:'90%'
        }} 
        _hover={{
          boxShadow:'2px 2px 4px #805ad580, -2px -2px 4px #805ad580, -2px 2px 4px #805ad580, 2px -2px 4px #805ad580'
        }}
        children={form_type.formName}
      />
    </CUI.Stack>
  </form>
  )
}
export default UserAuthentication;