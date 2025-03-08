import { Module } from '@nestjs/common';
import { ScheduleModule as SchedulerModule } from '@nestjs/schedule';
import { LinksModule } from './links/links.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedirectModule } from './redirect/redirect.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    SchedulerModule.forRoot(),
    PrismaModule,
    LinksModule,
    RedirectModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
