import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    title:string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(600)
    contents:string;

    @IsNotEmpty()
    @IsString()
    userId: string;
}