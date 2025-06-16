import { NestFactory } from '@nestjs/core';
import { AppModule } from './APPS/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 8080;
  await app.listen(8080);
  console.log(`Application is running on: http://localhost:${port}`);
  


}
bootstrap();
