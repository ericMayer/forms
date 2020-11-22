import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Estados } from '../../interfaces/estados.interface';
import { Usuario } from '../../interfaces/usuario.interface';
import { Error } from '../../interfaces/error.interface';
import { EnderecoService } from '../../services/endereco.service';
import { Cidades } from '../../interfaces/cidades.interface';
import { Endereco } from '../../interfaces/endereco.interface';
import { ModalDefaultComponent } from '../modal-default/modal-default.component';
import { DataModal } from '../../interfaces/data-modal.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-form-default',
  templateUrl: './form-default.component.html',
  styleUrls: ['./form-default.component.scss']
})
export class FormDefaultComponent {

  usuario: Usuario;
  estados: Estados[];
  cidades: Cidades[];
  invalid: boolean;
  uf: Estados;
  cidade: Cidades;
  error: Error[];
  data: DataModal;

  constructor(
    private router: Router,
    private enderecoService: EnderecoService,
    private matDialog: MatDialog,
    private usuarioService: UsuarioService,
  ) {
    this.usuario = { endereco: {}, };
    this.estados = [];
    this.cidades = [];
    this.error = [];
    this.getEstados();
  }

  goToRoute(path: string) {
    this.router.navigateByUrl(path);
  }

  getEndereco() {
    if (this.usuario && this.usuario.endereco && this.usuario.endereco.cep && this.usuario.endereco.cep.length == 8)
      this.enderecoService.getEnderecoByCep(this.usuario.endereco.cep).subscribe((endereco) => {
        if(endereco && !endereco.erro) this.setEndereco(endereco);
      });
  }

  setEndereco(endereco: Endereco) {
    this.usuario.endereco = endereco;
    this.cidade = { uf: endereco.uf, nome: endereco.localidade };
    this.uf = { sigla: endereco.uf }
    this.error = [];
  }

  cancel() {
    this.router.navigateByUrl('');
  }

  getEstados() {
    this.enderecoService.getAllEstados().subscribe((estados) => {
      this.estados = estados;
    });
  }

  setError(field: string, value: any) {
    if (value) {
      if(this.error) this.error.forEach((erro, index) => {
        if(erro.field == field) this.error.splice(index, 1);
      });
      this.setEstado();
    }
    else {
      if(field == 'estado') {
        if(!this.checkError('cidade') && this.cidade) this.addError('cidade');
        this.cidades = undefined;
        this.cidade = undefined;
      }
      this.addError(field);
    }
  }

  addError(field: string, message: string = 'Esse campo é obrigatório.') {
    this.error.push({field, message});
  }

  checkError(field: string): string {
    let message;
    if(this.error && this.error.length)
      return this.error.filter((erro) => erro.field == field).
        map((erro) => message = erro.message).length > 0 ? message : '';
  }

  formValid(): boolean {
    return this.usuario && this.usuario.nome && this.usuario.cpf && this.usuario.email && this.usuario.endereco && this.usuario.endereco.cep && this.usuario.endereco.numero && this.usuario.endereco.uf && this.usuario.endereco.localidade && this.usuario.endereco.logradouro ? false : true;
  }

  setEstado() {
    if (this.usuario && this.usuario.endereco && this.uf && this.uf.sigla) {
      this.usuario.endereco.uf = this.uf.sigla;
      this.getCidades(this.usuario.endereco.uf);
    }
  }

  getCidades(uf: string) {
    this.enderecoService.getCidadesByEstado(uf).subscribe((cidades) => {
      this.cidades = cidades;
      this.changeDataCidades();
    });
  }

  changeDataCidades() {
    if(this.cidades && this.cidades.length)
      this.cidades.forEach((cidade) => {
        cidade.microrregiao = undefined;
        if(this.uf && this.uf.sigla) cidade.uf = this.uf.sigla;
      });
  }

  
  postUsuario() {
    this.data = { error: this.usuarioService.postUsuario(this.usuario) };
    this.openModal();
  }

  openModal() {
    this.matDialog.open(ModalDefaultComponent, {
      width: '600px',
      panelClass: 'container-modal',
      data: this.data,
    });
  }
}
