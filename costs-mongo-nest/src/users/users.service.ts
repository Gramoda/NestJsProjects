import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "../auth/dto/createuser.dto";
import { User, UsersDocument } from "src/schemas/users.schema";
import { Model } from "mongoose";
import { LoginUserDto } from "src/auth/dto/loginuser.dto";

@Injectable()
export class UserService {
    constructor (@InjectModel(User.name) private userModel: Model<UsersDocument>,
    ) {}

    async registration (createUserDto: CreateUserDto): Promise<User> {

        const existingUser = await this.userModel.findOne({
            username: createUserDto.username
        })

        if (existingUser) {
            throw new ForbiddenException('This user already exists');
        }

        const createUser = new this.userModel(createUserDto);
        return createUser.save();

    }

    async findOne (username: string): Promise<User> {
        return this.userModel.findOne({username});
    }

    async login (loginUserDto: LoginUserDto): Promise<User>  {
        const user = await this.userModel.findOne({
            username: loginUserDto.username
        })

        if (!user) {
            throw new ForbiddenException('This user does not exist');
        }

        return user;
    }
 }