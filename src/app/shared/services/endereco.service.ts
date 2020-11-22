import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Endereco } from '../interfaces/endereco.interface';
import { Estados } from '../interfaces/estados.interface';
import { Cidades } from '../interfaces/cidades.interface';


@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(
    private http: HttpClient
  ) { }

  getEnderecoByCep(cep: string): Observable<Endereco> {
    if(cep) return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  getAllEstados(): Observable<Estados[]> {
    return <Observable<Estados[]>> this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  getCidadesByEstado(uf: string): Observable<Cidades[]> {
    return <Observable<Cidades[]>> this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  }
}
