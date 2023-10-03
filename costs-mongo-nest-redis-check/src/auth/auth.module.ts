import {Module} from "@nestjs/common"
import { UsersModule } from "src/users/users.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { JwtModule } from "@nestjs/jwt"
import { jwtConstants } from "./constants"
import { CacheModule } from "@nestjs/cache-manager"
import * as redisStore from "cache-manager-redis-store";

@Module({
    imports:[
        UsersModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30s' },
          }),
          CacheModule.register({
            store: redisStore,
            socket: {
              host:process.env.REDIS_HOST,
              port: process.env.PORT,
            }
          })
    ],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService],
    })
export class AuthModule {}