import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { resultados } from "../modelos/resultados.model";

@Injectable({
  providedIn: "root",
})
export class ResultadosService {
  constructor(private http: HttpClient) {}

  listarA1(): Observable<resultados[]> {
    return this.http.get<resultados[]>(
      `${environment.url_gateway}/visualizaciones/votos_mayores_candidato`
    );
  }

  listarA2(num_mesa: string): Observable<resultados[]> {
    return this.http.get<resultados[]>(
      `${environment.url_gateway}/visualizaciones/mesa/${num_mesa}`
    );
  }
}