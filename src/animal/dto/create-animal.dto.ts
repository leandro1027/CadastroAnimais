import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateAnimalDto {
    @IsString({message: "O nome precisa ser um texto!"})
    @IsOptional()
    nome: string
    @IsString({message: "A raça precisa ser um texto!"})
    @IsNotEmpty({message: "A raça do animal é obrigatória!"})
    raca: string
    @IsNotEmpty({message: "O local em que o animal foi encontrado é obrigatório!"})
    @IsString({message: "O local precisa ser um texto!"})
    local: string
    

}
