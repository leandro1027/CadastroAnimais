import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioservice: UsuarioService) {}

   @Get()
    findAll() {
      return this.usuarioservice.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usuarioservice.findOne(+id);
    }
  
    @Post()
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
      return this.usuarioservice.create(createUsuarioDto);
    }
  
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
      return this.usuarioservice.update(+id, updateUsuarioDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.usuarioservice.delete(+id);
    }
}