import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  raca: string;

  @IsString()
  @IsNotEmpty()
  local: string;

  @IsBoolean()
  doente: boolean;

  @IsOptional()
  @IsInt()
  adotadoPorId?: number;
}
