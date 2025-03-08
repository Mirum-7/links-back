import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeExpiredLinks() {
    try {
      const now = new Date();
      const result = await this.prisma.links.deleteMany({
        where: {
          expiredAt: {
            lt: now,
          },
        },
      });

      this.logger.log(`Removed ${result.count} expired links`);
    } catch (error) {
      this.logger.error('Failed to remove expired links:', error);
    }
  }
}
