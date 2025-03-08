import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './jsonBigInt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.LINKS_PORT ?? 1200);

  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Gracefully shutting down...');
    await app.close();
    process.exit(0);
  });
}
bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
