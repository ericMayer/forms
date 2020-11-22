import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataModal } from '../../interfaces/data-modal.interface';

@Component({
  selector: 'app-modal-default',
  templateUrl: './modal-default.component.html',
  styleUrls: ['./modal-default.component.scss']
})
export class ModalDefaultComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<ModalDefaultComponent>, @Inject(MAT_DIALOG_DATA) public data: DataModal) { 
    this.setMessage();
  }

  ngOnInit(): void {
  }

  close() {
    this.matDialogRef.close(true);
  }

  setMessage() {
    if(this.data && this.data.error) {
      this.data.title = 'Erro ao Cadastrar';
      this.data.message = 'Não foi possível realizar o cadastro do usuário.';
    } else {
      this.data = { title: 'Cadastro com Sucesso!', message: 'O usuário foi cadastrado com sucesso no sistema!'}
    }
  }

  getTextButton(): string {
    if(this.data) return this.data.error ? 'Tente Novamente' : 'Obrigado';
  }

}
