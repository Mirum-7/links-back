import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Links } from '@prisma/client';
import { CreateLinkDto } from './dto/link.dto';
import { LinksService } from './links.service';
import { LinkNotFound, LinkResponse } from './schema/link.response';

@ApiTags('links')
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @ApiBody({ type: CreateLinkDto })
  @ApiResponse({ status: 201, type: LinkResponse })
  create(@Body() createLinkDto: CreateLinkDto): Promise<Links> {
    return this.linksService.create(createLinkDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: LinkResponse })
  @ApiResponse({ status: 404, description: 'Not Found', type: LinkNotFound })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.linksService.delete(id);
  }
}
