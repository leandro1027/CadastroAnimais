import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { usuario } from './Usuario/entities/usuario.entity';
import { CreateUsuarioDto } from './Usuario/dto/create-usuario.dto';
import { UpdateUsuarioDto } from './Usuario/dto/update-usuario.dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
}
 