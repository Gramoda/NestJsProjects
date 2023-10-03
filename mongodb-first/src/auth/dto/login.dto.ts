import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class LoginDto {


    @IsNotEmpty()
    @IsEmail({}, {message: 'try to put in valid email'})
    readonly email : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

}