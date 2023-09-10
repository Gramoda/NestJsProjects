import { Module } from '@nestjs/common';
import { SubscribeMessage } from '@nestjs/websockets';
import { MyGateway } from './getaway';

@Module(
    {
    imports:[],
    providers:[MyGateway],

})
export class GetawayModule {

    

}
