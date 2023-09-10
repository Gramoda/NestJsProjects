import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";

export enum Category {
    ADVENTURE = 'Adventure',
    CALSSICS = 'Classics',
    CRIME = 'Crime',
    FANTASY = 'Fantasy',
  }
  
  @Schema({
    timestamps: true,
  })
  export class Books {
    @Prop()
    title: string;
  
    @Prop()
    @IsNotEmpty()
    description: string;
  
    @Prop()
    author: string;
  
    @Prop()
    price: number;
  
    @Prop()
    category: Category;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
  }
  
  export const BookSchema = SchemaFactory.createForClass(Books);

  