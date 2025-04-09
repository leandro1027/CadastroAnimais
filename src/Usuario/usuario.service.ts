import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { usuario } from "./entities/usuario.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";

@Injectable()
export class UsuarioService {

    private usuarios: usuario[] = [
        {
            id: 1,
            nome: "Nome 1",
            cpf: "1344444444",
            endereco: "Algum",
            email: "testando@gmail.com",
            ja_adotou: false
            
           
        }
      ]
       findAll() {
          return this.usuarios
        }
      
        findOne(id: number) {
          const usuario = this.usuarios.find(usuario => usuario.id === id)
      
          if (usuario) return usuario
          throw new HttpException("Esse usuario não existe!", HttpStatus.NOT_FOUND)
        }
      
        create(createusuarioDto: CreateUsuarioDto) {
          const newId = this.usuarios.length +1
      
          const newusuario = {
            id: newId,
            ...createusuarioDto
          }
        }
      
        
        update(id: number, updateusuarioDto: UpdateUsuarioDto) {
          const usuarioIndex = this.usuarios.findIndex(usuario => usuario.id === id)
      
          if(usuarioIndex < 0)
            throw new HttpException("Esse usuario não existe!", HttpStatus.NOT_FOUND)
      
          const usuarioItem = this.usuarios[usuarioIndex]
      
          this.usuarios[usuarioIndex] ={
            ...usuarioItem,
            ...updateusuarioDto
          }
          return "usuario atualizado!"
        } 
      
        remove(id: number) {
          const usuarioIndex = this.usuarios.findIndex(usuario => usuario.id === id)
      
          if(usuarioIndex < 0)
              throw new HttpException("Esse usuario não existe!", HttpStatus.NOT_FOUND)
      
          this.usuarios.splice(usuarioIndex, 1)
      
          return "usuario deletado!"
        }
}