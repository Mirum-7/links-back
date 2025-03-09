import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'The target URL of the link',
    example: 'https://example.com',
    type: 'string',
  })
  target: string;

  @IsNumber()
  @Max(5)
  @Min(1)
  @ApiProperty({
    description: 'The number of days the link will be active',
    minimum: 1,
    maximum: 5,
    type: 'number',
  })
  liveDays: string;
}
