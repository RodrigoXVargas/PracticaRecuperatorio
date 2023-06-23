export class Articulo {
    id: number;
    codigo: string;
    denominacion: string;
    precio: number;
    idrubro: number;

    constructor(
      id: number = 0,
      codigo: string = "",
      denominacion: string = "",
      precio: number = 0,
      idrubro: number = 0,
    ) {
      this.id = id;
      this.codigo = codigo;
      this.denominacion = denominacion;
      this.precio = precio;
      this.idrubro = idrubro;
    }
  }

