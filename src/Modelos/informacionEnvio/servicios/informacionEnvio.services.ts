import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { informacionEnvio } from 'src/database/Entidades/informacionEnvio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  crearInformacionEnvioDto,
  actualizarInformacionEnvioDto,
} from '../dto/informacionEnvio.dto';

@Injectable()
export class informacionEnvioService {
  constructor(
    @InjectRepository(informacionEnvio)
    private informacionEnvioRepo: Repository<informacionEnvio>,
  ) {}
  prueba(): string {
    return 'Mi primer servicio';
  }

  async crearInformacionEnvio(data: crearInformacionEnvioDto) {
    try {
      const nuevaInformacionEnvio = this.informacionEnvioRepo.create(data);
      return {
        statusCode: 201,
        message: 'Informacion de envio creada',
        response: await this.informacionEnvioRepo.save(nuevaInformacionEnvio),
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message,
      };
    }
  }

  async consultarInformacionEnvio(usuarioEmail: string) {
    return await this.informacionEnvioRepo.find({
      where: [{ usuarioEmail: usuarioEmail }],
    });
  }

  async consultarTodos() {
    const informacionEnvios = await this.informacionEnvioRepo.find();
    if (informacionEnvios.length > 0) {
      return informacionEnvios;
    } else {
      return {
        statusCode: 200,
        message: 'No hay informacionEnvios',
      };
    }
  }

  //Consultar informacionEnvio por Id
  async consultarUno(id: number) {
    const informacionEnvio = await this.informacionEnvioRepo.findOne({ where: { id: id } });
    if (informacionEnvio) {
      return informacionEnvio;
    } else {
      return {
        statusCode: 404,
        message: 'InformacionEnvio no encontrado',
      };
    }
  }

  async actualizarInformacionEnvio(id: number, data: actualizarInformacionEnvioDto) {
    try {
      const user = await this.informacionEnvioRepo.findOne({
        where: [{ id: id }],
      });

      if (user) {
        await this.informacionEnvioRepo.merge(user, data);
        return {
          statusCode: 200,
          message: 'Informacion de envio actualizada',
          response: await this.informacionEnvioRepo.save(user),
        };
      } else {
        return {
          statusCode: 404,
          message: 'Informacion de envio no encontrada',
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error Interno',
      };
    }
  }

  async eliminarInformacionEnvio(id: number) {
    try {
      const user = await this.informacionEnvioRepo.findOne({
        where: [{ id: id }],
      });

      if (user) {
        await this.informacionEnvioRepo.delete(user);
        return {
          statusCode: 200,
          message: 'Informacion de envio eliminada',
        };
      } else {
        return {
          statusCode: 404,
          message: 'Informacion de envio no encontrada',
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error Interno',
      };
    }
  }
}
