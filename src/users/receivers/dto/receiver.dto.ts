import { IsNotEmpty, IsEmail } from "class-validator";

export class ReceiverDto {
  @IsNotEmpty()
  rut: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  account: number;

  @IsNotEmpty()
  bank: string;
}
