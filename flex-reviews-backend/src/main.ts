import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with more permissive settings for Vercel
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Flex Reviews API')
    .setDescription(
      'API for managing property reviews from Hostaway and Google',
    )
    .setVersion('1.0')
    .addTag('reviews')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Use Vercel's PORT environment variable or default to 3000
  const port = process.env.PORT || appConfig.port || 3000;
  await app.listen(port);
  
  // Log the port for debugging
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();