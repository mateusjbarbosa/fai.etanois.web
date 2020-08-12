import { Component, OnInit, Input } from '@angular/core';
import { FuelService } from '../fuel/fuel.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Fuel } from '../fuel/fuel.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-elements',
  templateUrl: './modal-elements.component.html',
  styleUrls: ['./modal-elements.component.css']
})
export class ModalElementsComponent {
  fuel: Fuel = {
    name: undefined,
    price: undefined
  }
  closeResult = '';

  constructor(
    private dialogRef: MatDialogRef<ModalElementsComponent>,
    private fuelService: FuelService,
    private router: Router,
  ) { }

  onClose(result: Boolean) {
    // this.result = result;
    this.dialogRef.close(result);

  }

  createFuel(): void {
    this.fuelService.create(this.fuel).subscribe(
      res => {
        console.log('HTTP response', res);
        this.fuelService.showMessage('Combustível criado com sucesso!');
      },
      err => {
        console.log('error: ', err);
        this.fuelService.errorHandler('Erro!');
      },
      () => console.log('HTTP request completed.')
    );
  }

  title: String = 'Adicionar novo combustível';
  editarDialog(title: string): void {
    this.title = title;
  }
}
