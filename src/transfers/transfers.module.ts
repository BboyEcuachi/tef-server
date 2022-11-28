import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transfer, TransferSchema } from './schemas/transfer.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transfer.name, schema: TransferSchema }]),
    AuthModule
  ],
  controllers: [TransfersController],
  providers: [TransfersService]
})
export class TransfersModule {}
