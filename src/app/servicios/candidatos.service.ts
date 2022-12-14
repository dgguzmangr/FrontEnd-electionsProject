import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidatos } from '../modelos/candidatos.model';
import { partidos } from '../modelos/partidos.model';


@Injectable({
  providedIn: 'root'
})
export class CandidatosService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Candidatos[]> {
    return this.http.get<Candidatos[]>(`${environment.url_gateway}/candidatos`);
  }
  eliminar(cedula: string) {
    return this.http.delete<Candidatos>(`${environment.url_gateway}/candidatos/${cedula}`);
  }
  getCandidato(cedula: string): Observable<Candidatos> {
    return this.http.get<Candidatos>(`${environment.url_gateway}/candidatos/${cedula}`);
  }
  crear(elCandidato: Candidatos) {
  return this.http.post(`${environment.url_gateway}/candidatos`,
  elCandidato);
  }
  editar(cedula:string,elCandidato: Candidatos) {
  return this.http.put(`${environment.url_gateway}/candidatos/${cedula}`,
  elCandidato);
  }
  asignar(cedula:string,elCandidato: Candidatos, nombre:string,elPartido: partidos) {
    let bodyString = JSON.stringify({ elCandidato, elPartido});
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.http.put(`${environment.url_gateway}/candidatos/${cedula}/partido/${nombre}`,
    bodyString,{headers});
  }
}
