import { PartialType } from "@nestjs/mapped-types";
import { CreateUsuarioDto } from "./create-usuario.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUsuarioDto){

    @IsBoolean()
    @IsOptional()
    readonly ja_adotou?: boolean  

}
   