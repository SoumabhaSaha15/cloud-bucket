export type AuthFormSpanText = ("Already have an account "|"Don't have an account ");
export type SignUpOrLogin = ('SignUp'|'LogIn');
export type SignUpOnlyFiledNames = {ProfilePictureName:'ProfilePicture',UserName:'UserName'}|{ProfilePictureName:'',UserName:''};
export type PASSWORD_VISIBLE_OR_NOT = ({IconName:'eye-sharp',InputType:'password'}|{IconName:'eye-off-sharp',InputType:'text'});
export type FilePageResponse ={
  dp:string;
  files:string[]
};
export type ErrorResponse = {
  err_msg:string
}
export type ErrorFileResponse = {
  err_msg:string
  redirect:string
}
export type AuthPageResponse = {
  redirect : string;
}
export type uploadData = {
  name:string;
}
export type deleteRouteResponse = {
  deleted:string;
  fileName:string;
} 
export type FilesMap = {
  fileType:string;
  fileList:string[];
}