import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { ReceiversController } from './receivers/receivers.controller';
import { ReceiversService } from './receivers/receivers.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  providers: [UsersService, ReceiversService],
  controllers: [ReceiversController],
  exports: [UsersService]
})
export class UsersModule {}
