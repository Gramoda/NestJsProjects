import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse } from "@nestjs/websockets";
import { Socket,Server } from "socket.io";


@WebSocketGateway()
export class AppGateaway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
   
    private logger: Logger = new Logger('AppGateaway');

    handleDisconnect(client: Socket) {
        this.logger.log(`User with ${client.id} id disconnected`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`User with ${client.id} id connected`);
    }
   
    
    afterInit(server: Server) {
       this.logger.log('Initialized');
       console.log('idi nahuy')
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text: string): WsResponse<string> {
        //client.emit('msgToClient', text);
        return {event:'msgToClient',data:text }
    }
}