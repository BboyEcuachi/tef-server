import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, SchemaDefinitionProperty, Types } from 'mongoose';
import { toTransferDto } from 'src/shared/mapper';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferDto } from './dto/transfer.dto';
import { Transfer, TransferDocument } from './schemas/transfer.schema';

@Injectable()
export class TransfersService {
  constructor(@InjectModel(Transfer.name) private transferModel: Model<TransferDocument>) {}

  async create(
    { id: userId }: UserDto,
    createTransferDto: CreateTransferDto,
  ): Promise<TransferDto> {
    const data = {
      userId,
      ...createTransferDto
    }
    const createdTransfer = await this.transferModel.create(data);
    return toTransferDto(createdTransfer);
  }

  async findAll(
    { id: userId }: UserDto,
  ): Promise<TransferDto[]> {
    const query = { userId };
    const transfers = await this.transferModel.find(query).exec();
    return transfers.map((r) => toTransferDto(r));
  }

  async findOne(
    { id: userId }: UserDto,
    id: SchemaDefinitionProperty<Types.ObjectId>,
  ): Promise<TransferDto> {
    const query = { userId, _id: id as Types.ObjectId};

    const isValidObjectId = mongoose.isValidObjectId(id);

    if (!isValidObjectId) throw new HttpException('Bat request', HttpStatus.BAD_REQUEST);
    
    const transfer = await this.transferModel.findOne(query).exec();

    if (!transfer) throw new HttpException('Transfer not found', HttpStatus.UNAUTHORIZED);

    return toTransferDto(transfer);
  }
}
