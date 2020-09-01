import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Fuel } from './../../models/fuel.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuelService } from '../../services/fuel/fuel.service';

@Component({
  selector: 'app-fuel-add-edit',
  templateUrl: './fuel-add-edit.component.html',
  styleUrls: ['./fuel-add-edit.component.css']
})
export class FuelAddEditComponent implements OnInit {
  fuelGroup: FormGroup;
  fuel: Fuel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FuelAddEditComponent>,
    private formBuilder: FormBuilder,
    public fuelService: FuelService
  ) { }

  ngOnInit(): void {
    this.fuel = this.data.fuel;

    this.fuelGroup = this.formBuilder.group({
      fuel: [this.fuel.fuel || '', Validators.required],
      price: [this.fuel.price || '', Validators.required]
    });
  }

  createFuel = (event: Event) => {
    event.preventDefault();
    if (!this.fuelGroup.valid) { return; }
    const { fuel, price } = this.fuelGroup.value;
    const newFuel: Fuel = { fuel, price };
    this.fuelService.create(newFuel)
      .then((res) => {
        console.log(res);
        this.dialogRef.close();
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  updateFuel = (event: Event) => {
    event.preventDefault();
    if (!this.fuelGroup.valid) { return; }
    const { fuel, price } = this.fuelGroup.value;
    const newFuel: Fuel = { fuel, price };

    this.fuelService.update(this.fuel.id, newFuel)
      .then((res) => {
        console.log(res);
        this.dialogRef.close();
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  closeDialog = () => {
    this.dialogRef.close();
  }

  cancel = () => {
    this.closeDialog();
  }

}
