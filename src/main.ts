import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './jsonBigInt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.LINKS_PORT ?? 1200);
}
bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
