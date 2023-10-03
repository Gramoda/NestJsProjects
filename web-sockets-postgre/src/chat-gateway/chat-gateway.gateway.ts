import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import {Server, Socket} from 'socket.io'
import { ChatService } from 'src/chat/chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private chatService: ChatService){}
  
  handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`)
  }
  handleDisconnect(client: any) {
    throw new Error(`Disconnected ${client.id}`);
  }
  afterInit(server: any) {
    console.log("alive");
  }
  
  
  @WebSocketServer() server: Server
  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: Prisma.ChatCreateInput): Promise<void> {
    
    await this.chatService.createMessage(payload);
    console.log(payload);
    //this.server.send(payload);
    this.server.emit('recMessage',{
      msg:`${client.id}`,
      payload:payload,
    })
  }
}
