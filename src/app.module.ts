import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransfersModule } from './transfers/transfers.module';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [() => configuration] }),
    MongooseModule.forRoot("mongodb+srv://bboyecuachi:Sacrox.123@test-apps.pilnahp.mongodb.net/?retryWrites=true&w=majority"),
    TransfersModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
