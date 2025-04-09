import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { usuario } from './Usuario/entities/usuario.entity';
import { CreateUsuarioDto } from './Usuario/dto/create-usuario.dto';
import { UpdateUsuarioDto } from './Usuario/dto/update-usuario.dto';

@Injectable()
export class AppService {
   private usuarios: usuario[] = [
      {
          id: 1,
          nome: "Nome do usuário 1",
          cpf: "111.1.11.1.1.",
          endereco: "rua número 1",
          email: "teste@gmail.com",
          ja_adotou: true
         
      }
      
    ]

    findAll(){
      return this.usuarios
  }

  findOne(id: number){
      const user = this.usuarios.find(user => user.id === id)

      if(user) return user
      throw new HttpException("Esse usuário não existe!", HttpStatus.NOT_FOUND)
  }

  create(createUsuarioDto: CreateUsuarioDto){
      const newId = this.usuarios.length + 1

      const newUsuario = {
          id: newId,
          ...createUsuarioDto,
          ja_adotou: true
      }

      this.usuarios.push(newUsuario)
      
      return newUsuario
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto){
      const usuarioIndex = this.usuarios.findIndex(usuario => usuario.id === id)

      if(usuarioIndex < 0)
          throw new HttpException("Esse Usuário não existe!", HttpStatus.NOT_FOUND)
     
          const usuarioItem = this.usuarios[usuarioIndex]

          this.usuarios[usuarioIndex] = {
              ...usuarioItem,
              ...updateUsuarioDto
          }
      
      return "Usuário atualizado!"

  }

  remove(id: number){
      const usuarioIndex = this.usuarios.findIndex(usuario => usuario.id === id)

      if(usuarioIndex < 0)
          throw new HttpException("Esse usuário não existe!", HttpStatus.NOT_FOUND)

      this.usuarios.splice(usuarioIndex, 1)

      return "Usuário deletado!"
  }

}

