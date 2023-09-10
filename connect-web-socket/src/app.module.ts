import { Module } from '@nestjs/common';
import { SocketClientModule } from './sockets/socket-client.module';


@Module({
  imports: [SocketClientModule],
  controllers: [], 
  providers: [],
})
export class AppModule {}
