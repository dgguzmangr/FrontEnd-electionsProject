import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidatos } from '../../../modelos/candidatos.model';
import { CandidatosService } from '../../../servicios/candidatos.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  cedula: string = "";
  intentoEnvio: boolean = false;
  elCandidato: Candidatos = {
    cedula: "",
    nombre: "",
    apellido: "",
    numero_resolucion: null,
  }

  constructor(private miServicioCandidato: CandidatosService, private rutaActiva: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params._id) {
      this.modoCreacion = false;
      this.cedula = this.rutaActiva.snapshot.params._id;
      this.getCandidato(this.cedula)
      } else {
      this.modoCreacion = true;
      }
  }
  getCandidato(_id: string) {
    this.miServicioCandidato.getCandidato(_id).
    subscribe(data => {
    this.elCandidato = data;
    });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
    this.intentoEnvio = true;
    this.miServicioCandidato.crear(this.elCandidato).
    subscribe(data => {
    Swal.fire(
    'Creado',
    'El Candidato ha sido creado correctamente',
    'success'
    )
    this.router.navigate(["pages/candidatos/listar"]);
    });
    }
  }
  editar(): void {
    this.intentoEnvio=true;
    if (this.validarDatosCompletos()) {
      this.miServicioCandidato.editar(this.elCandidato._id, this.elCandidato).
        subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El candidato ha sido actualizado correctamente',
            'success'
          )
        this.router.navigate(["pages/candidatos/listar"]);
      });
    }
  }
  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elCandidato.cedula=="" ||
      this.elCandidato.numero_resolucion == null ||
      this.elCandidato.nombre == "" ||
      this.elCandidato.apellido == "" ||
      this.elCandidato.numero_resolucion == null ) {
    return false;
    }else{
      return true;
    }
  }
}