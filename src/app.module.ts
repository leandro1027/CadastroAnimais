import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './Usuario/usuario.module';
import { AnimalModule } from './Animal/animal.module';


@Module({
  imports: [UsuarioModule, AnimalModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
