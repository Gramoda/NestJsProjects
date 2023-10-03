import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ChatModule } from './chat/chat.module';




@Module({
  imports: [ChatModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
