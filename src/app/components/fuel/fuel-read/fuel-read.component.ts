import { Component, OnInit } from '@angular/core';
import { Fuel } from '../fuel.model';
import { FuelService } from '../fuel.service';

@Component({
  selector: 'app-fuel-read',
  templateUrl: './fuel-read.component.html',
  styleUrls: ['./fuel-read.component.css']
})
export class FuelReadComponent implements OnInit {
  fuels: Fuel[
    
  ]
  displayedColumns = ['id', 'name', 'price','action']

  constructor(private fuelService: FuelService) { }

  ngOnInit(): void {
    this.fuelService.read().subscribe(fuels => {
      this.fuels = this.fuels
      console.log(this.fuels)
    })
}
navigateToFuelCrud():void{
  
}
 }
