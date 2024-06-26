import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { camisa } from '../../Entidades/camisa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { crearCamisaDto, actualizarCamisaDto } from '../dto/camisa.dto';

@Injectable()
export class camisaService {
  constructor(
    @InjectRepository(camisa)
    private camisaRepo: Repository<camisa>,
  ) {}

  prueba(): string {
    return 'Mi primer servicio';
  }

  //Crear Camisa
  async crearCamisa(data: crearCamisaDto) {
    try {
      const nuevaCamisa = this.camisaRepo.create(data);
      return {
        statusCode: 201,
        message: 'Camisa creado',
        response: await this.camisaRepo.save(nuevaCamisa),
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error Interno',
      };
    }
  }

  //Consultar Camisas
  async consultarTodos() {
    return await this.camisaRepo.find();
  }

  //Consultar Camisas por marca
  async consultarTodosMarca(marca: string) {
    return await this.camisaRepo.find({ where: { marca: marca } });
  }
}
