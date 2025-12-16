import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component'; 
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { authGuard } from './admin/auth/auth.guard';
import { LoginComponent } from './admin/pages/login/login.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
   { path: 'login', component: LoginComponent},
  
  // <--- Cargar módulo admin
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },

  // Redirección opcional
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: '**', redirectTo: '/productos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }