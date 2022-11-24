import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidatos } from '../../../modelos/candidatos.model';
import { CandidatosService } from '../../../servicios/candidatos.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  candidatos : Candidatos[];
  nombresColumnas: string[] = ['Cedula', 'Nombre', 'Apellido','# Resolución', 'Partido'];
  constructor(private miServicioCandidatos: CandidatosService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar():void{
    this.miServicioCandidatos.listar().subscribe(data => {
      this.candidatos=data;
    });
  }
  agregar():void{
    this.router.navigate(["pages/candidatos/crear"]);
  }
  editar(_id:string):void{
    this.router.navigate(["pages/candidatos/actualizar/"+_id]);
  }
/*   asignar(cedula:string):void{
    this.router.navigate(["pages/candidatos/asignacion/"+cedula]);
  } */
  eliminar(_id:string):void{
    Swal.fire({
      title: 'Eliminar Candidato',
      text: "Estas seguro que quiere eliminar el candidato",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioCandidatos.eliminar(_id).subscribe(data => {
          Swal.fire(
            'Emliminado!',
            'El candidato ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}0