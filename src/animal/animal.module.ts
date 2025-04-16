import { Module } from '@nestjs/common';

import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AnimalController],
  providers: [AnimalService],
  imports: [PrismaModule],
})
export class AnimalModule {}
