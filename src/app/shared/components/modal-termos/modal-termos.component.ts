import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataModal } from '../../interfaces/data-modal.interface';

@Component({
  selector: 'app-modal-termos',
  templateUrl: './modal-termos.component.html',
  styleUrls: ['./modal-termos.component.scss']
})
export class ModalTermosComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<ModalTermosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataModal
  ) { }

  ngOnInit(): void {
  }

  public close(): void {
    this.matDialogRef.close(true);
  }

}
