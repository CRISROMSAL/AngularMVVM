import { Component } from '@angular/core';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  title = 'AngularMVVM';
  usuarios: any[] = [];
  error: string | null = null;
  data: any;  // Variable para almacenar los datos
  productos: any;
  loading: boolean = true;  // Indicador de carga

  constructor(private productoService: ProductosService) { }


ngOnInit() {

  console.log("ngOnInit called");
    this.getProductos();  // Cargar los datos cuando el componente se inicializa
  }
  
getProductos(): void {
  this.productoService.getData('usuarios').subscribe({
      next: (data) => {
        this.usuarios = data;  // Asignar los datos de productos
        this.productos = data;  // Asignar la respuesta a la variable 'data'
        this.loading = false;   // Detener el indicador de carga
      },
      error: (err) => {
        this.error = 'Error al cargar productos';  // Manejar errores
        console.error(err);
      }
    });
  }
}