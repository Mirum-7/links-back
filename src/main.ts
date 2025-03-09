import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import './jsonBigInt';
import { LinksModule } from './links/links.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validate incoming data
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'https://links.mirum7.dev',
    methods: 'GET,POST,DELETE',
    optionsSuccessStatus: 204,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Links API')
    .setDescription('API for managing links')
    .setVersion('1.0')
    .addTag('links')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      include: [LinksModule],
    });

  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  // Listen on port
  await app.listen(process.env.LINKS_PORT ?? 1200);

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Gracefully shutting down...');
    await app.close();
    process.exit(0);
  });
}
// Start the application
bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
