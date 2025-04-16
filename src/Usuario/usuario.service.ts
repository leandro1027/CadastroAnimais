import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { usuario } from "./entities/usuario.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { PrismaService } from "src/prisma/prisma.service";

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
      
      constructor(private readonly prismaService: PrismaService){}

      async findAll(){
          const allUsuarios = await this.prismaService.usuario.findMany()
          return allUsuarios
      }
      
      async findOne(id: number){
        const usuario = await this.prismaService.usuario.findFirst({
            where: {
                id:id
            }
        })

        if(usuario?.nome) return usuario
        throw new HttpException("Esse Usuário não existe!", HttpStatus.NOT_FOUND)
    }
      
        async create(createusuarioDto: CreateUsuarioDto) {
          try{
            const newUsuarios = this.prismaService.usuario.create({
              data:{
                  nome: createusuarioDto.nome,
                  cpf: createusuarioDto.cpf,
                  email: createusuarioDto.email,
                  ja_adotou: false
              }
          })
          return newUsuarios

        }catch(e){
            throw new HttpException("Não foi possivel cadastrar o usuário!", HttpStatus.BAD_REQUEST)
          }
        }
      
        
        async update(id: number, UpdateUsuarioDto: UpdateUsuarioDto){
          try{
           const findUsuario = await this.prismaService.usuario.findFirst({
               where: {
                   id: id
               }
           })
           
           if(!findUsuario)
               throw new HttpException("Esse usuário não existe!", HttpStatus.NOT_FOUND)
   
           const usuario = await  this.prismaService.usuario.update({
               where: {
                   id: findUsuario.id
               },
               data: UpdateUsuarioDto
           })
           return usuario
          } catch(e){
           throw new HttpException("Não foi possivel atualizar a tarefa!", HttpStatus.BAD_REQUEST)
          }
   
       }
      
       async delete(id: number){
        try{
            const findUsuario = await this.prismaService.usuario.findFirst({
                where: {
                    id: id
                }
            })

            if(!findUsuario)
                throw new HttpException("Esse usuário não existe!", HttpStatus.NOT_FOUND)

                await this.prismaService.usuario.delete({
                    where:{
                        id: findUsuario.id
                    }
                })

                return "Usuário excluido com sucesso!"
            }catch(e){
                throw new HttpException("Não possivel deletar ao usuário!", HttpStatus.BAD_REQUEST)
            }
        }
}