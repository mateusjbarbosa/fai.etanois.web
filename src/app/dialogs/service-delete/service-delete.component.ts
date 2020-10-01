import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GasStationServices } from '../../models/services.model';
import { GasStationService } from '../../services/gas-station/gas-station.service';

@Component({
  selector: 'app-service-delete',
  templateUrl: './service-delete.component.html',
  styleUrls: ['./service-delete.component.css']
})
export class ServiceDeleteComponent implements OnInit {
  public currentService: GasStationServices = undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ServiceDeleteComponent>,
    private gasStationService: GasStationService
  ) { }

  ngOnInit(): void {
    this.currentService = this.data.service;
  }

  confirmDelete = () => {
    this.gasStationService.deleteAvailableService(this.currentService.service_type)
      .then((res) => {
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
