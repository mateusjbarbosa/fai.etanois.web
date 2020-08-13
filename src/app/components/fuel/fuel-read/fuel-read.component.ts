import { Component, OnInit } from '@angular/core';
import { Fuel } from '../fuel.model';
import { FuelService } from '../fuel.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalElementsComponent } from '../../modal-elements/modal-elements.component';

@Component({
  selector: 'app-fuel-read',
  templateUrl: './fuel-read.component.html',
  styleUrls: ['./fuel-read.component.css']
})
export class FuelReadComponent implements OnInit {
  fuels = [
    {id: 1, name: 'Gasolina Comum', price: 5},
    {id: 2, name: 'Etanol', price: 2.7},
    {id: 3, name: 'Diesel', price: 3},
    {id: 4, name: 'Gasolina Comum', price: 3},
  ];
 
  
  displayedColumns = ['id', 'name', 'price','action']

  constructor(
    public dialog: MatDialog,
    private fuelService: FuelService) { }

  ngOnInit(): void {
    // this.fuelService.read().subscribe(fuels => {
    //   this.fuels = this.fuels
    //   console.log(this.fuels)
    //})
  }

navigateToFuelCrud():void{
  
}

openDialog() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    title:'Editar combustível',
    // message:'Deseja realmente excluir sua conta?'
}; 

let dialogRef = this.dialog.open(ModalElementsComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    console.log("encerrrado", result);
  });

}


 
}