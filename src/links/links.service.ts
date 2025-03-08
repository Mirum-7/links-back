import { Injectable, NotFoundException } from '@nestjs/common';
import { Links } from '@prisma/client';
import { createHash } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLinkDto } from './dto/link.dto';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  private generateHash(length: number = 8): string {
    const timestamp = new Date().getTime().toString();
    const randomString = Math.random().toString();
    const hash = createHash('sha256')
      .update(timestamp + randomString)
      .digest('hex');

    return hash.slice(0, length);
  }

  async create(createLinkDto: CreateLinkDto): Promise<Links> {
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + Number(createLinkDto.liveDays));

    const hash = this.generateHash();

    const link = await this.prisma.links.create({
      data: {
        target: createLinkDto.target,
        uriHash: hash,
        expiredAt,
      },
    });

    console.log(link);

    return link;
  }

  async delete(id: number) {
    try {
      return await this.prisma.links.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Link with ID ${id} not found`);
      }
      throw error;
    }
  }

  async findByHash(hash: string): Promise<Links> {
    const link = await this.prisma.links.findUnique({
      where: { uriHash: hash },
    });

    if (!link) {
      throw new NotFoundException(`Link with hash ${hash} not found`);
    }

    return link;
  }
}
