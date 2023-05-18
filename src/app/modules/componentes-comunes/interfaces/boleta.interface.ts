    export interface BoletaInterface{
        idBoleta: number;
        idParcialidad: number;
        resultadoPesaje: number;
    }

    export interface BoletaDataGeneral{
        estadoParcialidad: string;
        resultadoPesaje: number;
        estadoCuenta: string;
        tipoVehiculo: string;
        idParcialidad: number;
        placaVehiculo: string;
        idBoleta: number;
        transportistas: string;
        fechaPesaje: Date;
        noCuenta: string;
        usuarioPeso?: string;
    }
