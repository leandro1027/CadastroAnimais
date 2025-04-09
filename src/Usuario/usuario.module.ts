import { Module } from "@nestjs/common";
import { AnimalController } from "src/animal/animal.controller";
import { AnimalService } from "src/animal/animal.service";

@Module({
  imports: [UsuarioModule],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class UsuarioModule {}
