import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/users.schema";
import { UserService } from "./users.service";

@Module({
    imports:[
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    exports:[UserService],
    providers:[UserService],
    
})
export class UsersModule {}