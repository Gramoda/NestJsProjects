import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { UserSettings } from "./UserSetting.schema";
import { Post } from "./Posts.schema";

@Schema()
export class User {
    
    @Prop({unique:true, required:true })
    username: string;

    @Prop({ required:false })
    displayName?: string;

    @Prop({required:false})
    avatarUrl?:string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings'})
    settings?:UserSettings;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref:'Post'}]})
    posts: Post[];

    _id: string | ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User);