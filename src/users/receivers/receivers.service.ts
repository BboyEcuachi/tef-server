import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SchemaDefinitionProperty, Types } from 'mongoose';
import { toReceiverDto } from 'src/shared/mapper';
import { UserDto } from '../dto/user.dto';
import { UsersService } from '../users.service';
import { ReceiverDto } from './dto/receiver.dto';

@Injectable()
export class ReceiversService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async create(
    { username }: UserDto,
    createReceiverDto: ReceiverDto
  ): Promise<ReceiverDto> {
    const createdReceiver = await this.usersService.addReceiver(username, createReceiverDto);
    return createdReceiver;
  }

  async findAll({ username }: UserDto): Promise<ReceiverDto[]> {
    const user = await this.usersService.findOne(username);
    return user.receivers.map(r => toReceiverDto(r));
  }

  async findOne(
    { username }: UserDto,
    id: SchemaDefinitionProperty<Types.ObjectId>
  ): Promise<ReceiverDto> {
    const query = { _id: id };
    const user = await this.usersService.findOne(username);

    if (!user) throw new HttpException('Receiver not found', HttpStatus.UNAUTHORIZED);

    return toReceiverDto(user.receivers[0]);
  }
}
