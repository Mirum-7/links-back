import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  target: string;

  @IsNumber()
  liveDays: string;
}
