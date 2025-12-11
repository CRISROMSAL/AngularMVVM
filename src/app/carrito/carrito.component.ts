import { Component } from '@angular/core';
import { CarritoService } from '../carrito.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {

  title = 'AngularMVVM';
  usuarios: any[] = [];
  error: string | null = null;
  data: any;  // Variable para almacenar los datos
  carritos:any;
  loading: boolean = true;  // Indicador de carga

  constructor(private carritoService: CarritoService) { }
ngOnInit() {

  console.log("ngOnInit called");
    this.getCarritos();  // Cargar los datos cuando el componente se inicializa
  }
  
getCarritos(): void {
  this.carritoService.getData('usuarios').subscribe({
      next: (data) => {
        this.usuarios = data;  // Asignar los datos de productos
        this.carritos = data;  // Asignar la respuesta a la variable 'data'
        this.loading = false;   // Detener el indicador de carga
      },
      error: (err) => {
        this.error = 'Error al cargar productos';  // Manejar errores
        console.error(err);
      }
    });
  }
}
