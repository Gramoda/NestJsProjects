import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('cached_item', { key: 32 },  36000 );
    const cachedItem = await this.cacheManager.get('cached_item');
    console.log(cachedItem);
    return 'Hello World!';
  }
}