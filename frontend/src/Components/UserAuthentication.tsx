import React from "react";
import * as CUI from "@chakra-ui/react";
import IonIcon from '@reacticons/ionicons';
const UserAuthentication:React.FC<React.PropsWithChildren> = () => {
  const bgColor='#808080';
  const [form_type,set_form_type] =  React.useState({
    formName:'SignUp',
    spanText:'Already have an account ',
    display:'flex',
    height:'450px',
    required:true
  });
  const invert_form_name = (str:string):string=>{
    return (str == 'LogIn')?('SignUp'):('LogIn');
  }
  const invert_span_text = (str:string):string=>{
    return (str == 'Already have an account ')?("Don't have an account "):("Already have an account ");
  }
  const [DP,set_DP] = React.useState<string>('./../src/assets/react.svg');
  const [showPassword,setShowPassword] = React.useState<'eye-off-sharp'|'eye-sharp'>('eye-sharp');
  const [inputType,setInputType] = React.useState<'password'|'text'>('password');
   const [userData,setUserData] = React.useState({
    UserName:'',
    Password:'',
    Email:''    
  })
  const handleSubmit=():void=>{
    console.log(userData);
  }
  return (
  <form style={{
    width:'min(400px,90vw)',
    backgroundColor:'white',
    height:form_type.height,
    borderRadius:'10px',
    padding:'10px',
    boxShadow:'2px 2px 4px #808080, -2px -2px 4px #808080, -2px 2px 4px #808080, 2px -2px 4px #808080'
  }} 
  name={form_type.formName} 
  onSubmit={e=>{
    e.preventDefault();
    console.log(e);
    handleSubmit();
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
          }}/>
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
        placeholder="email" 
        variant='outline' 
        required 
        style={{
          borderColor:bgColor
        }}
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
        type={inputType} 
        value={userData.Password} 
        variant='outline' 
        required 
        style={{
          borderColor:bgColor
        }} 
        onChange={(e)=>{
          setUserData(v=>({...v,Password:e.target.value}))
        }}/>
         <CUI.InputRightElement 
         children={<IonIcon name={showPassword}/>}  
        onClick={()=>{
          setInputType(v=>(v=='password')?('text'):('password'));
          setShowPassword(v=>(v=='eye-sharp')?('eye-off-sharp'):('eye-sharp'));
        }}/>
      </CUI.InputGroup>
      <input 
      type="file" 
      accept="png,jpg" 
      required={form_type.required} 
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
         ({...v,display:'none',formName:invert_form_name(v.formName),spanText:invert_span_text(v.spanText),height:'225px',required:false}):
         ({...v,display:'flex',formName:invert_form_name(v.formName),spanText:invert_span_text(v.spanText),height:'450px',required:true}));
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