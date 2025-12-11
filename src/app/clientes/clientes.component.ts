import { Component } from '@angular/core';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {

 title = 'AngularMVVM';
  usuarios: any[] = [];
  error: string | null = null;
  data: any;  // Variable para almacenar los datos
  clientes:any;
  loading: boolean = true;  // Indicador de carga

  constructor(private clientesService: ClientesService) { }
ngOnInit() {

  console.log("ngOnInit called");
    this.getClientes();  // Cargar los datos cuando el componente se inicializa
  }
  
getClientes(): void {
  this.clientesService.getData('usuarios').subscribe({
      next: (data) => {
        this.usuarios = data;  // Asignar los datos de productos
        this.clientes = data;  // Asignar la respuesta a la variable 'data'
        this.loading = false;   // Detener el indicador de carga
      },
      error: (err) => {
        this.error = 'Error al cargar productos';  // Manejar errores
        console.error(err);
      }
    });
}

eliminarUsuario(id: number) {
  // Filtra la lista local
  this.usuarios = this.usuarios.filter(u => u.id !== id);

  // Si quieres eliminar en el backend
  this.clientesService.deleteData('usuarios', id).subscribe({
    next: res => console.log('Usuario eliminado', res),
    error: err => console.error('Error al eliminar usuario', err)
  });
}

agregarUsuario() {
  const nuevoId = this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;
  const nuevoUsuario = {
    id: nuevoId,
    nombre: 'Nuevo Usuario',
    email: '',
    telefono: '',
    direccion: ''
  };
  this.usuarios.push(nuevoUsuario);
}

editarUsuario(usuario: any) {
  // Pedimos al usuario que ingrese un nuevo nombre
  const nuevoNombre = prompt('Editar nombre del usuario', usuario.nombre);

  if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
    // Creamos un objeto con los datos actualizados
    const usuarioActualizado = { ...usuario, nombre: nuevoNombre };

    // Llamamos al servicio para actualizar en el backend
    this.clientesService.updateData('usuarios', usuario.id, usuarioActualizado).subscribe({
      next: (res) => {
        // Actualizamos la tabla local solo si la respuesta es exitosa
        usuario.nombre = nuevoNombre;
        console.log('Usuario actualizado correctamente', res);
      },
      error: (err) => {
        console.error('Error al actualizar el usuario', err);
        alert('No se pudo actualizar el usuario en el servidor.');
      }
    });
  }
}



}
