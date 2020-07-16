import { Component, OnInit } from '@angular/core';
import { Fuel } from '../fuel.model';
import { FuelService } from '../fuel.service';

@Component({
  selector: 'app-fuel-read',
  templateUrl: './fuel-read.component.html',
  styleUrls: ['./fuel-read.component.css']
})
export class FuelReadComponent implements OnInit {
  fuel: Fuel[]
  displayedColumns = ['id', 'name', 'action']

  constructor(private fuelService: FuelService) { }

  ngOnInit(): void {
    this.fuelService.read().subscribe(user => {
      this.fuel = this.fuel
      console.log(this.fuel)
    })

}
}
