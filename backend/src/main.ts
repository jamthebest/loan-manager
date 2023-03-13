import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure Swagger presentation options
  const options = new DocumentBuilder()
    .setTitle('Loans REST API')
    .setDescription('API Rest for personal loans')
    .setVersion('1.0')
    .build();
  // Preparing the configuration created for Swagger
  const document = SwaggerModule.createDocument(app, options);

  // Path where the documentation will be
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  console.log('environment variables', process.env);
  await app.listen(3000);
}
bootstrap();
