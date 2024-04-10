export type AuthFormSpanText = ("Already have an account "|"Don't have an account ");
export type SignUpOrLogin = ('SignUp'|'LogIn');
export type SignUpOnlyFiledNames = {ProfilePictureName:'ProfilePicture',UserName:'UserName'}|{ProfilePictureName:'',UserName:''}