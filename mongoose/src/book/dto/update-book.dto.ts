import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schemas/book.schema";
import { User } from "../../auth/schemas/user.schema";

export class UpdateBookDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description : string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNumber()
    readonly price: number;

    @IsEnum(Category, {message:'Please type correct category'})
    readonly category: Category;

    @IsNotEmpty({message: "You can't pass user id"})
    readonly user: User;
}