import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from "cache-manager-redis-store";
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [CacheModule.register({
    store: redisStore,
    socket: {
      host:'127.0.0.1',
      port:6379
    }
  })],
  controllers: [AppController],
  providers: [AppService,
  {
    provide:APP_INTERCEPTOR,
    useClass: CacheInterceptor
  }],
})
export class AppModule {}
