import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { RolesGuard } from './Auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 

  const webUrl = process.env.MOBILE_APP_URL ?? "http://localhost:3001";

  app.enableCors({
    origin: webUrl,
    credentials: true,
  })

  const configService = app.get(ConfigService);


  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalGuards(
    new RolesGuard(
      app.get(Reflector),
    )
  )

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);

  console.log(`Server is running on http://localhost:${port}/api`)
  
}
bootstrap();
