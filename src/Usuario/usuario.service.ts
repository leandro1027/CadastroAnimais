import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(pagination: { limit: number; offset: number }) {
    const { limit, offset } = pagination;
    return await this.prismaService.usuario.findMany({
      skip: offset,
      take: limit,
    });
  }
  

  async findOne(id: number) {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { id },
      include: { animaisAdotados: true },
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return usuario;
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = await this.prismaService.usuario.create({
        data: createUsuarioDto,
      });

      return usuario;
    } catch (error) {
      throw new HttpException('Erro ao criar o usuário!', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioExistente = await this.prismaService.usuario.findUnique({
      where: { id },
    });

    if (!usuarioExistente) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    try {
      const usuarioAtualizado = await this.prismaService.usuario.update({
        where: { id },
        data: updateUsuarioDto,
      });

      return usuarioAtualizado;
    } catch (error) {
      throw new HttpException('Erro ao atualizar o usuário!', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    const usuarioExistente = await this.prismaService.usuario.findUnique({
      where: { id },
    });

    if (!usuarioExistente) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    try {
      await this.prismaService.usuario.delete({ where: { id } });
      return { message: 'Usuário removido com sucesso!' };
    } catch (error) {
      throw new HttpException('Erro ao deletar o usuário!', HttpStatus.BAD_REQUEST);
    }
  }
}
