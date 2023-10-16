import { IsNotEmpty } from "class-validator";

export class CreateTrackDto {

    @IsNotEmpty()
    readonly name:string;

    @IsNotEmpty()
    readonly artist:string;

    @IsNotEmpty()
    readonly text:string;
}