import { IsNotEmpty } from "class-validator";


export class CreateCostDto {
    @IsNotEmpty()
    readonly text: string;

    @IsNotEmpty()
    readonly price: string;

    @IsNotEmpty()
    readonly date: Date;

    @IsNotEmpty()
    readonly userid: string;


}