import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class AnimalService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto

    const animals = await this.prisma.animal.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        adotadoPor: true,
      },
    });

    return animals;
  }

  async findOne(id: number) {
    const animal = await this.prisma.animal.findUnique({
      where: { id },
      include: {
        adotadoPor: true,
      },
    });

    if (!animal) {
      throw new HttpException('Esse animal não existe!', HttpStatus.NOT_FOUND);
    }

    return animal;
  }

  async create(createAnimalDto: CreateAnimalDto) {
    try {
      const newAnimal = await this.prisma.animal.create({
        data: {
          raca: createAnimalDto.raca,
          local: createAnimalDto.local,
          doente: createAnimalDto.doente,
          adotadoPorId: createAnimalDto.adotadoPorId || null,
        },
      });

      return newAnimal;
    } catch (error) {
      throw new HttpException('Erro ao cadastrar animal.', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    const existingAnimal = await this.prisma.animal.findUnique({ where: { id } });

    if (!existingAnimal) {
      throw new HttpException('Esse animal não existe!', HttpStatus.NOT_FOUND);
    }

    try {
      const updatedAnimal = await this.prisma.animal.update({
        where: { id },
        data: {
          raca: updateAnimalDto.raca ?? existingAnimal.raca,
          local: updateAnimalDto.local ?? existingAnimal.local,
          doente: updateAnimalDto.doente ?? existingAnimal.doente,
          adotadoPorId: updateAnimalDto.adotadoPorId ?? existingAnimal.adotadoPorId,
        },
      });

      return updatedAnimal;
    } catch (error) {
      throw new HttpException('Erro ao atualizar animal.', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const existingAnimal = await this.prisma.animal.findUnique({ where: { id } });

    if (!existingAnimal) {
      throw new HttpException('Esse animal não existe!', HttpStatus.NOT_FOUND);
    }

    try {
      await this.prisma.animal.delete({
        where: { id },
      });

      return 'Animal deletado com sucesso!';
    } catch (error) {
      throw new HttpException('Erro ao deletar animal.', HttpStatus.BAD_REQUEST);
    }
  }
}
