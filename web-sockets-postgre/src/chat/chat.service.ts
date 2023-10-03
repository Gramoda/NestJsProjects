import { Injectable } from "@nestjs/common";
import { Chat, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ChatService {
    constructor (private readonly prisma:PrismaService) {}
    
    async createMessage(data: Prisma.ChatCreateInput): Promise<Chat> {
        return await this.prisma.chat.create({data});

    }

    async getMessages(): Promise<Chat[]> {
        return await this.prisma.chat.findMany()
    }

}