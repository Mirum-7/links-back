import { ApiProperty } from '@nestjs/swagger';

export class LinkResponse {
  @ApiProperty({
    description: 'The unique identifier of the link',
    example: 1,
    type: 'string',
  })
  id: string;

  @ApiProperty({
    description: 'The target URL of the link',
    example: 'https://example.com',
    type: 'string',
  })
  target: string;

  @ApiProperty({
    description: 'The number of days the link will be active',
    example: 5,
    minimum: 1,
    maximum: 5,
    type: 'number',
  })
  liveDays: number;

  @ApiProperty({
    description: 'date when the link will expire',
    example: '2024-01-01T00:00:00.000Z',
    type: 'string',
  })
  expiredAt: Date;
}

export class LinkNotFound {
  @ApiProperty({
    description: 'Error message',
    example: 'Link with ID 1 not found',
    type: 'string',
  })
  message: string;

  @ApiProperty({
    description: 'Error code',
    example: '404',
    type: 'number',
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error status',
    example: 'Not Found',
    type: 'string',
  })
  error: string;
}
