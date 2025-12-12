import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductosService } from '../productos.service';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  productos: any[] = [];
  categorias: any[] = [];
  error: string | null = null;
  loading: boolean = true;

  myForm: FormGroup;

  constructor(private productoService: ProductosService, private categoriaService: CategoriasService) {
    this.myForm = new FormGroup({
      nombre: new FormControl(''),
      precio: new FormControl(''),
      categoriaId: new FormControl('')
    });
  }

  ngOnInit() {
    this.getProductos();
    this.getCategorias();
  }

  getProductos(): void {
    this.productoService.getData().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar productos';
        console.error(err);
      }
    });
  }

  getCategorias(): void {
    this.categoriaService.getData().subscribe({
      next: (data) => {
        this.categorias = data;  // Guardamos las categorías
        console.log("Categorías:", this.categorias);
      },
      error: (err) => {
        this.error = 'Error al cargar categorías';
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (confirm("¿Estás seguro de que deseas dar de alta?")) {
      this.productoService.postData(this.myForm.value).subscribe({
        next: (nuevoProducto) => {
          this.productos.push(nuevoProducto);
          this.myForm.reset();
        },
        error: (err) => {
          this.error = 'Error al agregar producto';
          console.error(err);
        }
      });
    }
  }
}