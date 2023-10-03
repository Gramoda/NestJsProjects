import { Controller, Get, Res } from '@nestjs/common';
import { ChatService } from './chat.service';


@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('chat')
  async getMessages(@Res() res) {
    const messages = await this.chatService.getMessages();
    console.log(messages);
    return res.send(messages);
  }
}