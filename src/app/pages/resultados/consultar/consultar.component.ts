import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { resultados } from "../../../modelos/resultados.model";
import { ResultadosService } from "../../../servicios/resultados.service";
import { MesasService } from "../../../servicios/mesas.service";
import { mesas } from "../../../modelos/mesas.model";

@Component({
  selector: "ngx-listar",
  templateUrl: "./consultar.component.html",
  styleUrls: ["./consultar.component.scss"],
})
export class ConsultarComponent implements OnInit {
  selectedValue: string;
  mesas: mesas[];
  votaciones: resultados[];
  nombresColumnas: string[] = [
    "Nombre Candidato",
    "Apellido Candidato",
    "Nombre Partido",
    "Cantidad de Votos",
  ];
  constructor(
    private miServicioVotaciones: ResultadosService,
    private laMesa: MesasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarA1();
    this.laMesa.listarMesas().subscribe((data) => {
      this.mesas = data;
    });
  }
  listarA1(): void {
    this.miServicioVotaciones.listarA1().subscribe((data) => {
      this.votaciones = data;
    });
  }

  listarA2(): void {
    this.miServicioVotaciones.listarA2(this.selectedValue).subscribe((data) => {
      this.votaciones = data;
    });
  }
}