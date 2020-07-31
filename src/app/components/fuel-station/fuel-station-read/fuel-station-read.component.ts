import { Component, OnInit } from '@angular/core';
import { FuelStation } from '../fuel_station.model';
import { FuelStationService } from '../fuel-state.service';

@Component({
  selector: 'app-fuel-station-read',
  templateUrl: './fuel-station-read.component.html',
  styleUrls: ['./fuel-station-read.component.css']
})
export class FuelStationReadComponent implements OnInit {
  fuelStation: FuelStation[]
  // displayedColumns = ['id', 'name', 'cnpj', 'street', 'neighborhood', 'cep'
  //   , 'time_to_open', 'time_to_close', 'cep', 'flag_of_fuel_station', 'openning_hours',
  //   'time_to_open', 'car_wash', 'mechanical', 'action']
  displayedColumns = ['id', 'name', 'cnpj', 'street', 'neighborhood', 'cep'
    , 'time_to_open', 'time_to_close', 'action']

  constructor(private fuelStationService: FuelStationService) { }

  ngOnInit(): void {
    this.fuelStationService.read().subscribe(fuelStation => {
      this.fuelStation = fuelStation
      console.log(fuelStation)
    })
  }

}