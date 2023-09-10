import {  Controller, Get } from '@nestjs/common';
import { CacheKey, CacheTTL, } from '@nestjs/cache-manager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @CacheKey('some_routed')
  @CacheTTL(30)
  async getHello() {
    return this.appService.getHello();
  }
}