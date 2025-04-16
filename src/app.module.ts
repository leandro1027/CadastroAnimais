import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './Usuario/usuario.module';


@Module({
  imports: [UsuarioModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
