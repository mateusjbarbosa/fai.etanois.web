import { FuelService } from './../../services/fuel/fuel.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fuel-delete',
  templateUrl: './fuel-delete.component.html',
  styleUrls: ['./fuel-delete.component.css']
})
export class FuelDeleteComponent implements OnInit {
  fuelId: number;
  fuelName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FuelDeleteComponent>,
    public fuelService: FuelService
  ) { }

  ngOnInit(): void {
    this.fuelId = this.data.fuelId;
    this.fuelName = this.data.fuelName;
  }

  confirmDelete = () => {
    this.fuelService.delete(this.fuelId)
      .then(() => {
        this.closeDialog();
      })
      .catch((err: HttpErrorResponse) => {
        console.log('Erro ao deletar usuário', err);
      });
  }

  closeDialog = () => {
    this.dialogRef.close();
  }

  cancel = () => {
    this.closeDialog();
  }

}
