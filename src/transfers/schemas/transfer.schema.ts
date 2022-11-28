import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Receiver } from 'src/users/receivers/schemas/receiver.schema';

export type TransferDocument = HydratedDocument<Transfer>;

@Schema()
export class Transfer {
  _id: ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId: ObjectId;
  
  @Prop({ required: true })
  receiver: Receiver;
  
  @Prop({ required: true })
  amount: number;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);