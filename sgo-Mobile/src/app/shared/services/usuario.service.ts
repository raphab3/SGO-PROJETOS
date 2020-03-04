import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ChamadoInterface } from '../interfaces/Chamado';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  buscar() {
    return this.http.get<ChamadoInterface[]>(`${environment.baseUrl}usuario/`);
  }


}






