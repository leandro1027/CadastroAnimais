import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class AnimalService {

  private animais: Animal[] = [
    {
        id: 1,
        nome: "Animal 1",
        raca: "Vira lata",
        local: "Em frente a praça x",
        doente: false
       
    }
    
  ]
  
  findAll() {
    return this.animais
  }

  findOne(id: number) {
    const animal = this.animais.find(animal => animal.id === id)

    if (animal) return animal
    throw new HttpException("Esse animal não existe!", HttpStatus.NOT_FOUND)
  }

  create(createAnimalDto: CreateAnimalDto) {
    const newId = this.animais.length +1

    const newAnimal = {
      id: newId,
      ...createAnimalDto
    }
  }

  
  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    const animalIndex = this.animais.findIndex(animal => animal.id === id)

    if(animalIndex < 0)
      throw new HttpException("Esse animal não existe!", HttpStatus.NOT_FOUND)

    const animalItem = this.animais[animalIndex]

    this.animais[animalIndex] ={
      ...animalItem,
      ...updateAnimalDto
    }
    return "Animal atualizado!"
  } 

  remove(id: number) {
    const animalIndex = this.animais.findIndex(animal => animal.id === id)

    if(animalIndex < 0)
        throw new HttpException("Esse animal não existe!", HttpStatus.NOT_FOUND)

    this.animais.splice(animalIndex, 1)

    return "Animal deletado!"
  }
}
