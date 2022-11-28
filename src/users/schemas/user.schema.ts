import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Receiver } from '../receivers/schemas/receiver.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: ObjectId;

  @Prop({ required: true, unique: true })
  username: string;
  
  @Prop({ required: true })
  password: string;

  @Prop({ required: true , default: [] })
  receivers: Receiver[];
}


export const UserSchema = SchemaFactory.createForClass(User);