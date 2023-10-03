import { ForbiddenException, Inject, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt";
import { access } from "fs";
import { User } from "src/schemas/users.schema";
import { UserService } from "src/users/users.service";
import { jwtConstants } from "./constants";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    }

    async validateUser(username: string): Promise<User> | null {
        const user = await this.userService.findOne(username);

        if (!user) {
            return null;
        }

        return user;
    }

    async generateAccessToken(user: User) {

        const access_token = this.jwtService.sign({ user });
        await this.cacheManager.set(user._id.toString(), { key: access_token }, 30000);
        const cachedItem = await this.cacheManager.get(user._id.toString());
        console.log(cachedItem);
        return {
            access_token: access_token,
        };
    }


    async generateRefreshToken(userId: string) {
        return {
            refresh_token: this.jwtService.sign(
                { userId },
                {
                    secret: jwtConstants.secret,
                    expiresIn: "30d",
                },
            ),
        };
    }

    verifyToken(token: string) {
        try {
            return this.jwtService.verify(token);

        } catch (error) {
            return { error: error.message }
        }
    }

    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    async getUserByTokenData(token: string): Promise<User> {
        const parsedTokenData = this.parseJwt(token);

        return await this.userService.findOne(parsedTokenData.user.username);
    }
}
