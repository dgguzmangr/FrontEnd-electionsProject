import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { partidos } from "../modelos/partidos.model";
import { usuario } from "../modelos/usuario.model";

@Injectable({
  providedIn: "root",
})
export class PartidosService {
  constructor(private http: HttpClient) {}

  listar(): Observable<partidos[]> {
    return this.http.get<partidos[]>(`${environment.url_gateway}/partidos`);
  }
  eliminar(nombre: string) {
    return this.http.delete<partidos>(
      `${environment.url_gateway}/partidos/${nombre}`
    );
  }
  getPartido(nombre: string): Observable<partidos> {
    return this.http.get<partidos>(
      `${environment.url_gateway}/partidos/${nombre}`
    );
  }
  crear(elPartido: partidos) {
    return this.http.post(`${environment.url_gateway}/partidos`, elPartido);
  }
  editar(nombre: string, elPartido: partidos) {
    return this.http.put(
      `${environment.url_gateway}/partidos/${nombre}`,
      elPartido
    );
  }
}