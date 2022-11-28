import { UserDto } from "src/users/dto/user.dto";
import { User } from "src/users/schemas/user.schema";
import { Transfer } from "src/transfers/schemas/transfer.schema";
import { ReceiverDto } from "src/users/receivers/dto/receiver.dto";
import { Receiver } from "src/users/receivers/schemas/receiver.schema";
import { TransferDto } from "src/transfers/dto/transfer.dto";

export const toUserDto = (data: User): UserDto => {  
  const { _id, username, receivers } = data;
  let userDto: UserDto = { id: String(_id), username, receivers };
  return userDto;
};

export const toReceiverDto = (data: Receiver): ReceiverDto => {  
  const { ...receiver } = data;
  let receiverDto: ReceiverDto = { ...receiver };
  return receiverDto;
};

export const toTransferDto = (data: Transfer): TransferDto => {  
  const { _id, userId, receiver, amount } = data;

  let updateTransferDto: TransferDto = { id: String(_id), userId: String(userId), receiver, amount };
  return updateTransferDto;
};
