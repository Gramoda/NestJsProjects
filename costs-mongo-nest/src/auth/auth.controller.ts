import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common'
import { UserService } from 'src/users/users.service';
import { CreateUserDto } from './dto/createuser.dto';
import { Response } from 'express';
import { RegistrationGuard } from './guards/registration.guard';
import { LoginUserDto } from './dto/loginuser.dto';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { error } from 'console';
import { RefreshJwtGuard } from './guards/refresh.jwt';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService) { }

    @UseGuards(LoginGuard)
    @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {

        const user = await this.userService.login(loginUserDto);

        const access = await this.authService.generateAccessToken(user);
        const refresh_token = await this.authService.generateRefreshToken(user._id as string);

        res.statusCode = HttpStatus.OK;

        return res.send({ ...access, ...refresh_token, username: user.username });

    }

    @UseGuards(RegistrationGuard)
    @Post('registration')
    async registrationUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {

        await this.userService.registration(createUserDto);

        res.statusCode = HttpStatus.CREATED;

        return res.send('user created');

    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Res() res: Response) {

        const validToken = this.authService.verifyToken(
            refreshTokenDto.refresh_token,
        );

        const user = await this.userService.findOne(refreshTokenDto.username);

        const access = await this.authService.generateAccessToken(user);

        if (validToken?.error) {
            if (validToken?.error === "jwt expired") {
                const refresh = await this.authService.generateRefreshToken(user._id as string);

                res.statusCode = HttpStatus.OK;
                return res.send({ ...access, ...refresh });
            } else {
                res.statusCode = HttpStatus.BAD_REQUEST;
                return res.send({ error: validToken?.error })
            }
        } else {
            res.statusCode = HttpStatus.OK;
            return res.send({ ...access, refesh_token: refreshTokenDto.refresh_token });
        }
    }

}
