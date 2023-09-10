import { Module } from '@nestjs/common';
import { GetawayModule } from './getaway/getaway.module';


@Module({
  imports: [GetawayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
