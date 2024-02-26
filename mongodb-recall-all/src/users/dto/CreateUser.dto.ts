import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export class CreateUserSettingsDto {
   
    @IsBoolean()
    @IsOptional()
    receiveNotification?: boolean;

    @IsBoolean()
    @IsOptional()
    recieveEmails?: boolean;

    @IsBoolean()
    recieveSMS?:boolean;
}

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @IsOptional()
    displayName?:string;
    
    @IsOptional()
    @ValidateNested()
    @Type(()=> CreateUserSettingsDto)
    settings?: CreateUserSettingsDto;

}