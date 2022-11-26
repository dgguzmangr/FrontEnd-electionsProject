import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { mesas } from "../../../modelos/mesas.model";
import { MesasService } from "../../../servicios/mesas.service";

@Component({
  selector: "ngx-listar",
  templateUrl: "./consultar.component.html",
  styleUrls: ["./consultar.component.scss"],
})
export class ConsultarComponent implements OnInit {
  mesas: mesas[];
  nombresColumnas: string[] = [
    "Número de Mesa",
    "Número de Cedulas Inscritas",
    "Opciones",
  ];
  constructor(private miServicioMesas: MesasService, private router: Router) {}

  ngOnInit(): void {
    this.listar();
  }
  listar(): void {
    this.miServicioMesas.listar().subscribe((data) => {
      this.mesas = data;
    });
  }
  listarMesas(): void {
    this.miServicioMesas.listarMesas().subscribe((data) => {
      this.mesas = data;
    });
  }
  agregar(): void {
    this.router.navigate(["pages/mesas/crear"]);
  }
  editar(_id:string): void {
    this.router.navigate(["pages/mesas/actualizar/"+_id]);
  }
  eliminar(_id:string): void {
    Swal.fire({
      title: "Eliminar Mesa",
      text: "Estas seguro que quiere eliminar la mesa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioMesas.eliminar(_id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "La mesa ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}