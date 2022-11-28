import { PartialType } from '@nestjs/mapped-types';
import { CreateTransferDto } from './create-transfer.dto';

export class TransferDto extends PartialType(CreateTransferDto) {
  id: string;
  userId: string;
}
