import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalDto } from './create-animal.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {

    @IsOptional()
    @IsNotEmpty()
    readonly doente?: boolean
}
