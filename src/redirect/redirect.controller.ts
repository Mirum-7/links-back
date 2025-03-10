import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { LinksService } from '../links/links.service';

@Controller('/')
export class RedirectController {
  constructor(private readonly linksService: LinksService) {}

  @Get(':hash')
  async redirect(@Param('hash') hash: string, @Res() res: Response) {
    const link = await this.linksService.findByHash(hash);

    return res.redirect(link.target);
  }
}
