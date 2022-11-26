import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartidosRoutingModule } from './partidos-routing.module';
import { ConsultarComponent } from './consultar/consultar.component';
import { CrearComponent } from './crear/crear.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConsultarComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    PartidosRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class PartidosModule { }
