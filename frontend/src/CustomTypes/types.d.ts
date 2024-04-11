export type AuthFormSpanText = ("Already have an account "|"Don't have an account ");
export type SignUpOrLogin = ('SignUp'|'LogIn');
export type SignUpOnlyFiledNames = {ProfilePictureName:'ProfilePicture',UserName:'UserName'}|{ProfilePictureName:'',UserName:''};
export type PASSWORD_VISIBLE_OR_NOT = ({IconName:'eye-sharp',InputType:'password'}|{IconName:'eye-off-sharp',InputType:'text'});