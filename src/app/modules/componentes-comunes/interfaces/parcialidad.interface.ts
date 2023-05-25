export interface ParcialidadInterface {
  idCuentaCorriente?: number;
  fechaEnvio?: Date;
  autorizo?: string;
  fechaEntrega?: Date;
  numeroCuenta: string;
  peso: number;
  idParcialidad: number;
  placa?: string;
  licencias?: string;
  estado: number;
  nombreEstado: string;
  tipoMedida: string;
}

export interface EnvioParcialidadInterface {
    idCuentaCorriente: number; 
    numeroCuenta: string;
    placaVehiculo: string;
    idParcialidad: number;
    peso: number;
    mensaje?: string;
    licenciasTransportistas: string;
}

export interface ParcialidadModel {
  idParcialidad: number;
  numeroCuenta: string;
  estadoParcialidad: number;
  pesoParcialidad: number;
  fechaParcialidadEnviada?: Date;
  fechaParcialidadEntregada: Date;
  licenciasTransportistas: string;
  placaVehiculo: string;
  usuarioCreacion: string;
  fechaCreacion: Date;
}