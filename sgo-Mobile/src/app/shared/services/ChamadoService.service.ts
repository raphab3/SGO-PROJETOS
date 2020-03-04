import { ChamadoInterface } from './../interfaces/Chamado';
import { HttpClient } from '@angular/common/http';
import { CategoriaData } from './../../tab-novoChamado/categoriaData';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  chamado: ChamadoInterface[];
  categoria: CategoriaData[];

  constructor(private http: HttpClient) {}

  buscar(filtro: any) {
    return this.http.get<ChamadoInterface[]>(`${environment.baseUrl}listarchamados/?search=${filtro}`);
  }


  buscarId(id) {
    return this.http.get<ChamadoInterface>(`${environment.baseUrl}listarchamados/${id}/`);
  }

  buscarChamado(id) {
    return this.http.get<ChamadoInterface>(`${environment.baseUrl}chamado/${id}/`);
  }

  adicionar(chamado: any) {
    return this.http.post<any>(`${environment.baseUrl}chamado/`, chamado);
  }

  deletar(id: number) {
    return this.http.delete(`${environment.baseUrl}chamado/${id}/`);
  }

  atualizar(chamado: ChamadoInterface) {
    return this.http.put(`${environment.baseUrl}chamado/${chamado.id}/`, chamado);
  }

  atualizarItem(id, chamado: ChamadoInterface) {
    return this.http.patch(`${environment.baseUrl}chamado/` + id + '/', chamado);
  }

  atualizarFeed(chamado: ChamadoInterface) {
    return this.http.patch(`${environment.baseUrl}chamado/${chamado.id}/`, chamado);
  }


  empreendimentoProprietario() {
    return this.http.get(`${environment.baseUrl}listageralapartamentos/`);
  }

  listarCategorias() {
    return this.http.get<CategoriaData[]>(`${environment.baseUrl}listarcategoriasdeproblema/`);
  }

  listarApartamentos() {
    return this.http.get<any[]>(`${environment.baseUrl}listageralapartamentos/`);
  }

  listarAreasComuns() {
    return this.http.get<any[]>(`${environment.baseUrl}listarareascomuns/`);
  }

}






