import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { mesas } from "../../../modelos/mesas.model";
import { MesasService } from "../../../servicios/mesas.service";

@Component({
  selector: "ngx-crear",
  templateUrl: "./crear.component.html",
  styleUrls: ["./crear.component.scss"],
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  numero: string="";
  intentoEnvio: boolean = false;
  laMesa: mesas = {
    numero: "",
    cantidad_inscritos: null,
  };

  constructor(
    private miServicioMesas: MesasService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params._id) {
      this.modoCreacion = false;
      this.numero = this.rutaActiva.snapshot.params._id;
      this.getMesa(this.numero)
    } else {
      this.modoCreacion = true;
    }
  }
  getMesa(_id: string) {
    this.miServicioMesas.getMesa(_id).subscribe((data) => {
      this.laMesa = data;
    });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioMesas.crear(this.laMesa).subscribe((data) => {
        Swal.fire("Creado", "La Mesa ha sido creado correctamente", "success");
        this.router.navigate(["pages/mesas/consultar"]);
      });
    }
  }
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioMesas
        .editar(this.laMesa._id, this.laMesa)
        .subscribe((data) => {
          Swal.fire(
            "Actualizado",
            "La Mesa ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["pages/mesas/consultar"]);
        });
    }
  }
  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if (this.laMesa.numero == "" || this.laMesa.cantidad_inscritos == null) {
      return false;
    } else {
      return true;
    }
  }
}

