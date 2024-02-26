import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./User.schema";
import mongoose from "mongoose";

@Schema()
export class Post {

    @Prop({required: true})
    title: string;

    @Prop({required:true})
    contents: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}

export const PostsSchema = SchemaFactory.createForClass(Post);

