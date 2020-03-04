import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { EmpresaData } from './empresaData';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresa: EmpresaData;
  token: string;

  constructor(private http: HttpClient){}

  buscarEmpresa() {
    return this.http.get<EmpresaData>(`${environment.baseUrl}empresa/`);
  }

}
