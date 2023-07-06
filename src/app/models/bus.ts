import { Model } from './model';

export class Bus {
  id: number;
  patente: string;
  cantidadAsientos: number;
  modeloId: number;
  model: Model;

  constructor(
    id: number,
    patente: string,
    cantidadAsientos: number,
    modeloId: number
  ) {
    this.id = id;
    this.patente = patente;
    this.cantidadAsientos = cantidadAsientos;
    this.modeloId = modeloId;
  }
}
