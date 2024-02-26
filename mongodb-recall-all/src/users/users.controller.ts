import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { ObjectId } from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Get()
    getAllUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id:string ){
        const findUser = await this.userService.getUserById(id as string);
        if(!findUser) throw new HttpException('User not found', 404);
        return findUser;
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const updateUser = await this.userService.updateUser(id as string, updateUserDto);
        if(!updateUser) throw new HttpException('User not found', 404);
        return updateUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const deletedUser = await this.userService.deleteUser(id as string);
        if(!deletedUser) throw new HttpException('User not found', 404);
        return deletedUser;
    }
}