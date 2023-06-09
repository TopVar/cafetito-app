export interface MensajeInterface {
    idMensaje: number; 
    numeroCuenta: string;
    placaVehiculo: string;
    idParcialidad: number;
    parcialidades: number;
    totalPesaje: number;
    codigoEstado: number;
    mensaje: string;
    aprobado: number;
    correccion: number;
    usuarioCreacion: string;
    fechaCreacion: Date;
    idCuentaCorriente: number;
}

export interface RespuestaInterface {
    titulo: string;
    contenido: string;
}

export interface MensajeBcInterface {
  idMensaje: number;
  estadoMensaje: number;
  numeroCuenta: string;
  placaVehiculo?: string;
  idParcialidad: number;
  parcialidades: number;
  totalPesaje: number;
  mensaje: string;
  aprobado: number;
  correccion: number;
  usuarioCreacion?: string;
  fechaCreacion: string;
}