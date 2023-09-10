import { ForbiddenException, Injectable } from "@nestjs/common";

import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({

})
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {

  }
  async signUp(dto: AuthDto) {


    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },

      })

      
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }


  async signIn(dto: AuthDto) {

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      }
    });

    if (!user) throw new ForbiddenException('credentials incorrect');
    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Crenditals incorrect');
    }

  
    return this.signToken(user.id, user.email);
  }

    async signToken(userId: number, email: string) : Promise<{access_token:string}>{
    const payload = {
      sub: userId,
      email,
    }

    const secret = this.config.get ('JWT_SECRET');
    console.log(secret);

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret:secret
    });

    return {
      access_token: token
    };
    
  }
}

