import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator'
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    @Get('me')
    getMe(@GetUser('') user: User) {
        console.log({
            user: user,

        })
        return user;
    }

    @Patch()
    editUser(){
        
    }
}
