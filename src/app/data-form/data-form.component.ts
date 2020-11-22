import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import '@angular/common'

import { ModalTermosComponent } from '../shared/components/modal-termos/modal-termos.component';
import { Cidades } from '../shared/interfaces/cidades.interface';
import { DataModal } from '../shared/interfaces/data-modal.interface';
import { Endereco } from '../shared/interfaces/endereco.interface';
import { Error } from '../shared/interfaces/error.interface';
import { Estados } from '../shared/interfaces/estados.interface';
import { Usuario } from '../shared/interfaces/usuario.interface';
import { EnderecoService } from '../shared/services/endereco.service';
import { FormValidations } from '../shared/utils/form-validations.class';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  public form: FormGroup;
  public opcoes: string[];
  public usuario: Usuario;
  public errors: Error[];
  public cidades: Cidades[];
  public estados: Estados[];
  public listaTermos: string[];
  public textModalsTermos: DataModal[];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private enderecoService: EnderecoService,
    private matDialog: MatDialog
  ) {
    this.usuario = {};
    this.errors = [];
    this.listaTermos = ['Termos de Privacidade', 'Termos de uso dos cookies'];
    this.textModalsTermos = [];
    this.setTextoModalsTermos();
  }

  ngOnInit(): void {
    this.initForm();
    this.getEstados();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      confirmarEmail: ['', [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: ['', [Validators.required, Validators.minLength(5)]],
        numero: ['', [Validators.required, Validators.maxLength(5)]],
        complemento: [''],
        logradouro: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        uf: ['', [Validators.required]],
        cidade: ['', [Validators.required]]
      }),
      termos: this.buildTermos(),
    });
  }

  public buildTermos() {
    const values = this.listaTermos.map(() => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredChecked());
  }

  cadastrarUsuario(): void {
    let formNew = Object.assign({}, this.form.value);
    formNew.termos = this.setTextoTermos();
    console.log(this.form);
  }

  back(): void {
    this.location.back();
  }

  getInvalid(field: string): boolean {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  setError(field: string): void {
    if (this.errors && this.errors.length)
      this.errors.find((erro, index) => {
        if (erro.field.toLowerCase() == field)
          this.errors.splice(index, 1);
      });
    if (this.form.get(field) && !this.form.get(field).valid && this.form.get(field).touched)
      this.addError(field);
  }

  addError(field: string, message: string = 'Esse campo é obrigatório'): void {
    if (field == 'email' || field == "confirmarEmail" && this.form.get(field).errors[field]) {
      if (!this.form.get(field).value && this.form.get(field).touched)
        message = 'Campo obrigatório.'
      else if (this.form.get(field).invalid && this.form.get(field).touched)
        message = 'E-mail inválido.';
    }
    else if (field == 'cpf' && this.form.get(field).errors['minlength'])
      message = 'CPF inválido.';
    this.errors.push({ field, message });
  }

  getError(field: string): string {
    if (this.errors && this.errors.length && field)
      return this.errors.filter((erro) => erro.field.toLowerCase() == field.toLowerCase())
        .map((erro) => erro.message).join(',');
  }

  getEndereco() {
    if (this.form && this.form.get('endereco.cep').valid)
      this.enderecoService.getEnderecoByCep(this.form.get('endereco.cep').value).subscribe((endereco) => {
        if (endereco && !endereco.erro) this.setEndereco(endereco);
      });
  }

  setEndereco(endereco: Endereco) {
    this.form.patchValue({
      endereco: {
        uf: endereco.uf,
        cidade: endereco.localidade,
        bairro: endereco.bairro,
        logradouro: endereco.logradouro,
      }
    });
  }

  // Método recursivo para ser chamado quando por algum motivo o formulário for submetido e não estiver válido, daí irá marcar todos os campos e do formulário, mesmo os campos aninhados
  validForm(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      form.get(field).markAsTouched();
      if (form instanceof FormGroup) this.validForm(form);
    });
  }

  getEstados() {
    this.enderecoService.getAllEstados().subscribe((estados) => {
      this.estados = estados;
    });
  }

  getCidades(estado: Estados) {
    this.enderecoService.getCidadesByEstado(estado.sigla).subscribe((cidades) => {
      this.cidades = cidades;
    });
  }

  public setTextoTermos(): string[] {
    let termos = [];
    this.form.get('termos').value.forEach((valor, index) => {
      if (valor) termos.push(this.listaTermos[index]);
    });
    return termos;
  }

  public openModalTermos(posicao: number): void {
    this.matDialog.open(ModalTermosComponent, {
      data: this.textModalsTermos[posicao],
      panelClass: 'container-modal',
      maxWidth: '500px'
    });
  }

  public setTextoModalsTermos(): void {
    if (this.listaTermos && this.listaTermos.length)
      this.listaTermos.forEach((termo) => {
        this.textModalsTermos.push({
          title: termo,
          message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti dignissimos fuga asperiores sit rerum, deleniti dolorum voluptatem inventore ratione doloribus, perspiciatis vero architecto nostrum minima neque impedit dolore repellendus! Provident.'
        });
      });
  }

  public validationCustom(field: string, error: string): boolean {
    return this.form.get(field).touched && !this.form.get(field).hasError(error) && this.form.get(field).valid;
  }

  public invalidationCustom(field: string, error: string): boolean {
    return this.form.get(field).hasError(error) || this.form.get(field).invalid && this.form.get(field).touched;
  }

  public getErrorCustomEqualsTo(field: string, error: string, otherField: string): string {
    if (this.form.get(field).hasError(error) && this.form.get(field).touched && this.form.get(otherField).touched && this.form.get(field).valid)
      return 'Por favor, digite um e-mail igual ao digitado acima';
    else if (!this.form.get(field).value && this.form.get(field).touched)
      return 'Campo obrigatório.'
    else if (this.form.get(field).invalid && this.form.get(field).touched)
      return 'E-mail inválido';
  }
}
