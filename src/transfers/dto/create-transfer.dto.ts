import { IsNotEmpty } from "class-validator";
import { ReceiverDto } from "src/users/receivers/dto/receiver.dto";

export class CreateTransferDto {
  @IsNotEmpty()
  receiver: ReceiverDto;
  @IsNotEmpty()
  amount: number;
}
