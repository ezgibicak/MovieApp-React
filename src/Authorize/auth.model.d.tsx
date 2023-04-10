export interface claim {
     name:string;
     value:string;
}
export interface userCredentials
{
password:string;
email:string;
}
export interface authenticationResponse
{
token:string;
expiration:Date;
}
export interface userDTO
{
id:string;
email:string;
}