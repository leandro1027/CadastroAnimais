import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'O nome precisa ser um texto!' })
  @MaxLength(20, { message: 'O nome deve ter no máximo 20 caracteres!' })
  @IsNotEmpty({ message: 'O nome é obrigatório!' })
  nome: string;

  @IsString({ message: 'O CPF precisa ser um texto!' })
  @MaxLength(11, { message: 'O CPF deve ter no máximo 11 dígitos!' })
  @IsNotEmpty({ message: 'O CPF é obrigatório!' })
  cpf: string;

  @IsEmail({}, { message: 'O e-mail precisa ser válido!' })
  @MaxLength(30, { message: 'O e-mail deve ter no máximo 30 caracteres!' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório!' })
  email: string;

  @IsBoolean({ message: 'O campo "ja_adotou" precisa ser verdadeiro ou falso!' })
  @IsNotEmpty({ message: 'O campo "ja_adotou" é obrigatório!' })
  ja_adotou: boolean;
}
