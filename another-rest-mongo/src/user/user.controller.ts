import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user';
import { UserDto } from './dto/user.dto';
@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get()
    getUser(): User[] {
      return this.userService.getUsers();
    }
    
    @Get(':id')
    findUser(@Param('id') id:number): User {
      console.log(id);
      return this.userService.findUser(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    postUser(@Body() user:UserDto): User{
      return this.userService.postUser(user);
    }

    @Delete(':email')
    deleteUser(@Param('email') email:string): User[]{
      return this.userService.deleteUser(email);
    }
}
