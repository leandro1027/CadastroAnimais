import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioservice: UsuarioService) {}

  @Get()
   findAll(@Query() paginationDto: PaginationDto) {
    console.log("Todos os usuarios!")
     return this.usuarioservice.findAll(paginationDto);
   }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioservice.findOne(id);
  }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioservice.create(createUsuarioDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioservice.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioservice.delete(id);
  }
}
