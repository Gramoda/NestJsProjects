import { IsNotEmpty } from "class-validator";


export class UpdateCostDto {
    @IsNotEmpty()
    readonly text: string;

    @IsNotEmpty()
    readonly price: string;

    @IsNotEmpty()
    readonly date: Date;

   


}