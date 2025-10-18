import { Apoderado } from '../entities/apoderado.model';

// Interfaz que define las operaciones que el dominio necesita para trabajar
export interface ApoderadoRepository {
  findAll(): Promise<Apoderado[]>;
  findById(id: string): Promise<Apoderado | null>;
  create(payload: Partial<Apoderado>): Promise<Apoderado>;
  update(id: string, payload: Partial<Apoderado>): Promise<Apoderado>;
  remove(id: string): Promise<void>;
}

/*
  Comentario: La implementación concreta (infraestructura) proporcionará
  estos métodos usando HTTP. El dominio y los casos de uso dependen sólo
  de esta abstracción para facilitar tests y separación de responsabilidades.
*/
