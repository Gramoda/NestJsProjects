import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatService } from './chat.service';
import { ChatGateway } from 'src/chat-gateway/chat-gateway.gateway';
import { ChatController } from './chat.controller';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [PrismaService, ChatService,ChatGateway],
  exports:[ChatService],
})
export class ChatModule {}
