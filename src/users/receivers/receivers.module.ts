import { Module } from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { ReceiversController } from './receivers.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  controllers: [ReceiversController],
  providers: [ReceiversService]
})
export class ReceiversModule {}
