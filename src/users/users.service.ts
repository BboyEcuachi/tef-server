import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { toUserDto } from 'src/shared/mapper';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { ReceiverDto } from './receivers/dto/receiver.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password } = userDto;
    const query = { username };
    const userInDb = await this.userModel.findOne(query).exec();
    
    if (userInDb) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const user: User = await this.userModel.create({
      username,
      password: await hash(password, 10),
    });

    return toUserDto(user);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const query = { username };
    
    const user = await this.userModel.findOne(query).exec();
    
    if (!user) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    const areEqual = await compare(password, user.password);

    if (!areEqual) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return toUserDto(user);
  }

  async findOne(username: string): Promise<UserDto> {
    const query = { username };
    const user = await this.userModel.findOne(query).exec();

    if (!user) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    return toUserDto(user);
  }

  async addReceiver(username: string, createReceiverDto: ReceiverDto ): Promise<ReceiverDto> {
    const query = { username };

    const user = await this.findOne(username);
    const receiverRepeated = user.receivers.filter((r) => r.account == createReceiverDto.account).length;

    if (receiverRepeated) throw new HttpException('Receiver repeated', HttpStatus.UNAUTHORIZED);

    const userUpdated = await this.userModel.updateOne(query, { $push: { receivers: createReceiverDto } }).exec();

    if (!userUpdated) throw new HttpException('User not updated', HttpStatus.UNAUTHORIZED);

    return createReceiverDto;
  }
}
