import { IsNotEmpty } from 'class-validator';
import { Receiver } from '../receivers/schemas/receiver.schema';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  receivers: Receiver[];

  createdOn?: Date;
}
