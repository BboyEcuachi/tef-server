import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferDto } from './dto/transfer.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createTransferDto: CreateTransferDto,
    @Req() req: any,
  ) {
    const user = req.user as UserDto;
    return this.transfersService.create(user, createTransferDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(
    @Req() req: any,
  ): Promise<TransferDto[]> {
    const user = req.user as UserDto;
    return this.transfersService.findAll(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<TransferDto> {
    const user = req.user as UserDto;
    console.log("transfer findOne: ", user, id);
    
    return this.transfersService.findOne(user, id);
  }
}
