import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';
import { ValidateCreateUserPipe } from './pipes/validate-create-user/validate-create-user.pipe';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get()
    getUser(@Query('sortBy') sortBy: string) {
        return this.userService.fetchUsers();
    }

    @Get('posts')
    getUserPosts() {
        return [{
            username: 'Arthur',
            email: 'Doshirex@gmail.com',
            posts: [
                {
                    id: 1,
                    title: "post 1"
                },
                {
                    id: 2,
                    title: "post 2"
                }

            ]
        }]
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto){
       console.log(userData.age);

       return this.userService.createUser(userData);
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id:number){
        return this.userService.getUserById(id);
    }

}
