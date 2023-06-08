import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';

let app: TestingModule;

beforeAll(async () => {
  app = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const prismaService = app.get<PrismaService>(PrismaService);
  prismaService.enableShutdownHooks(app);
});

afterAll(async () => {
  await app.close();
});
