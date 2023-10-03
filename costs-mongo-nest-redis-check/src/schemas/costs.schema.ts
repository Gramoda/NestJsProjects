import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type CostsDocument = Costs & Document;

@Schema()
export class Costs {

    @Prop({required:true})
    text: string;

    @Prop({required:true})
    price: string;

    @Prop({required:true, default:Date.now()})
    date: Date;

    @Prop({required:true, default:'1'})
    userid: string;

    _id: mongoose.Types.ObjectId | string;
}

export const CostsSchema = SchemaFactory.createForClass(Costs);