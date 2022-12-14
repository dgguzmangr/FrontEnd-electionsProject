import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';

/* import { ActualizarComponent } from './actualizar/actualizar.component'; */
const routes: Routes = [
  {
    path: 'listar',
    component: ListarComponent
  },
  {
    path: 'crear',
    component: CrearComponent
  },
  {
    path: 'actualizar/:_id',
    component: CrearComponent
  },
  {
    path: 'asignacion/:_id/partido/:_id',
    component: CrearComponent
  },    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatosRoutingModule { }
