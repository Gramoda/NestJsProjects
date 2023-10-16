import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly text: string;
    
    @IsNotEmpty()
    readonly trackId: string;
}