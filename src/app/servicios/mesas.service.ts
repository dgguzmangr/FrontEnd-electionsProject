import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { mesas } from '../modelos/mesas.model';
import { usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  constructor(private http: HttpClient) { }

  listarMesas(): Observable<mesas[]> {
    return this.http.get<mesas[]>(`${environment.url_gateway}/consulta_num_mesas`);
  }
  listar(): Observable<mesas[]> {
    return this.http.get<mesas[]>(`${environment.url_gateway}/mesas`);
  }
  eliminar(numero: string) {
    return this.http.delete<mesas>(`${environment.url_gateway}/mesas/${numero}`);
  }
  getMesa(numero: string): Observable<mesas> {
    return this.http.get<mesas>(`${environment.url_gateway}/mesas/${numero}`);
  }
  crear(laMesa: mesas) {
  return this.http.post(`${environment.url_gateway}/mesas`,
  laMesa);
  }
  editar(numero:string,laMesa: mesas) {
  return this.http.put(`${environment.url_gateway}/mesas/${numero}`,
  laMesa);
  }
}