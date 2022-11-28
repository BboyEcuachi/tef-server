import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Receiver {
  @Prop({ required: true })
  rut: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  account: number;

  @Prop({ required: true })
  bank: string;
}
