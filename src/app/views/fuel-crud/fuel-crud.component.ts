import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalElementsComponent } from 'src/app/components/modal-elements/modal-elements.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fuel-crud',
  templateUrl: './fuel-crud.component.html',
  styleUrls: ['./fuel-crud.component.css']
})
export class FuelCrudComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
  }

  // navigateToFuelCrud(): void {
  //   this.router.navigate(['fuel/create'])
  // }

  openDialog() {
    let dialogRef = this.dialog.open(ModalElementsComponent); 
    dialogRef.afterClosed().subscribe(result => {
      console.log("encerrrado", result);
    });

  }



}
