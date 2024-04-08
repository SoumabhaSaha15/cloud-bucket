import React from "react";
import * as CUI from "@chakra-ui/react";
import IonIcon from '@reacticons/ionicons';
const UserAuthentication:React.FC<React.PropsWithChildren> = () => {
  const bgColor='#808080';
  const [form_type,set_form_type] =  React.useState<{formName:('SignUp'|'LogIn'),
  spanText:('Already have an account '|"Don't have an account "),display:('flex'|'none'),height:('450px'|'225px'),
  required:boolean}>({
    formName:'SignUp',
    spanText:'Already have an account ',
    display:'flex',
    height:'450px',
    required:true
  });
  const invert_form_name = (str:('SignUp'|'LogIn')):('SignUp'|'LogIn')=>{
    return (str == 'LogIn')?('SignUp'):('LogIn');
  }
  const invert_span_text = (str:('Already have an account '|"Don't have an account ")):('Already have an account '|"Don't have an account ")=>{
    return (str == 'Already have an account ')?("Don't have an account "):("Already have an account ");
  }
  const [fieldName,setFieldName] = React.useState<{ProfilePictureName:'ProfilePicture',UserName:'UserName'}|{ProfilePictureName:'',UserName:''}>({
    ProfilePictureName:'ProfilePicture',
    UserName:'UserName'
  });
  const [DP,set_DP] = React.useState<string>('./../src/assets/user.svg');
  const [passwordVisibility,setPasswordVisibility] = React.useState<{IconName:'eye-sharp',InputType:'password'}|{IconName:'eye-off-sharp',InputType:'text'}>({IconName:'eye-sharp',InputType:'password'});
  const [userData,setUserData] = React.useState({
    UserName:'',
    Password:'',
    Email:''    
  });
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
      <label htmlFor="DP">
        <CUI.Tooltip 
        fontSize='md'
        label={'profile picture'}
        color={'black'}
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
      </label>
      <CUI.InputGroup size='lg' style={{display:form_type.display}}>
        <CUI.InputLeftAddon children={<IonIcon name="person-circle-outline"/>} style={{
          borderColor:bgColor,
          backgroundColor:bgColor
        }}/>
        <CUI.Input 
        type="text" 
        value={userData.UserName} 
        placeholder="Your name" 
        variant='outline' 
        style={{
          borderColor:bgColor,
        }}
        name={fieldName.UserName}
        isRequired={form_type.required} 
        onChange={(e)=>{
          setUserData(v=>({...v,UserName:e.target.value}))
        }}/>
      </CUI.InputGroup>
      <CUI.InputGroup size='lg'>
        <CUI.InputLeftAddon 
        children={<IonIcon name="mail-open-outline" style={{fontSize:'large'}}/>} 
        style={{
          backgroundColor:bgColor,
          borderColor:bgColor
        }}/>
        <CUI.Input 
        type="email" 
        value={userData.Email} 
        placeholder="enter email" 
        variant='outline' 
        required 
        style={{
          borderColor:bgColor
        }}
        name={'Email'}
        onChange={(e)=>{
          setUserData(v=>({...v,Email:e.target.value}))
        }}
        />
      </CUI.InputGroup>
      <CUI.InputGroup size='lg'>
        <CUI.InputLeftAddon 
        children={<IonIcon name="lock-closed"/>} 
        style={{
          backgroundColor:bgColor,
          borderColor:bgColor,
        }} />
        <CUI.Input 
        placeholder="enter password" 
        type={passwordVisibility.InputType} 
        value={userData.Password} 
        variant='outline'
        name={'Password'} 
        required 
        style={{
          borderColor:bgColor
        }} 
        onChange={(e)=>{
          setUserData(v=>({...v,Password:e.target.value}))
        }}/>
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
      accept="png,jpg" 
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
      type="submit" 
      style={{
        backgroundColor:bgColor
      }} 
      _hover={{
        boxShadow:'2px 2px 4px #404040, -2px -2px 4px #404040, -2px 2px 4px #404040, 2px -2px 4px #404040'
      }}
      >
        {form_type.formName}
      </CUI.Button>
    </CUI.Stack>
  </form>
  )
}
export default UserAuthentication;