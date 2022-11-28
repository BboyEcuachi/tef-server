import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { ReceiverDto } from './dto/receiver.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../dto/user.dto';

@Controller('users/receivers')
export class ReceiversController {
  constructor(private readonly receiversService: ReceiversService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createReceiverDto: ReceiverDto,
    @Req() req: any,
  ): Promise<ReceiverDto> {
    const user = req.user as UserDto;
    
    return this.receiversService.create(user, createReceiverDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(
    @Req() req: any,
  ): Promise<ReceiverDto[]> {
    const user = req.user as UserDto;

    return this.receiversService.findAll(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<ReceiverDto> {
    const user = req.user as UserDto;

    return this.receiversService.findOne(user, id);
  }
}
