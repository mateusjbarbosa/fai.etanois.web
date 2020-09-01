import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { FuelStation } from './../../models/gas-station.model';
import { BASE_URL } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GasStationService {
  private gasStationGetPath = 'fuel_station/';
  private gasStationCreatePath = 'fuel_station/new';

  @Input()
  public currentGasStation: FuelStation;

  @Output()
  public currentGasStationChange: EventEmitter<FuelStation> = new EventEmitter<FuelStation>();

  @Input()
  public gasStations: FuelStation[] = [];

  @Output()
  public gasStationsChange: EventEmitter<FuelStation[]> = new EventEmitter<FuelStation[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  setCurrentGasStation = (gasStation: FuelStation) => {
    this.currentGasStation = gasStation;
    this.currentGasStationChange.emit(this.currentGasStation);
  }

  getCurrentGasStation = (): FuelStation => {
    return this.currentGasStation;
  }

  clearsetCurrentGasStation = () => {
    this.currentGasStation = undefined;
    this.currentGasStationChange.emit(this.currentGasStation);
  }

  setGasStations = (gasStation: FuelStation) => {
    this.gasStations.push(gasStation);
    this.gasStationsChange.emit(this.gasStations);
  }

  clearGasStation = () => {
    this.currentGasStation = undefined;
    this.gasStations = [];
    this.gasStationsChange.emit(this.gasStations);
    this.currentGasStationChange.emit(this.currentGasStation);
  }

  getGasStationsByUserId = async (userId: number) => {
    return await this.http.get(BASE_URL + this.gasStationGetPath + 3, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res: { payload: FuelStation }) => {
        this.setGasStations(res.payload);
        return res.payload;
      })
      .catch((err) => {
        throw err;
      });
  }

  create = async (gasStation: FuelStation) => {
    return await this.http.post(BASE_URL + this.gasStationCreatePath, gasStation, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  // getAllGasStations = async (userId: number) => {
  //   return await this.http.get(BASE_URL + this.gasStationPath + userId, { headers: this.authService.getHeaders() })
  //     .toPromise()
  //     .then((gasStation: FuelStation) => {
  //       this.setGasStation(gasStation);
  //       return gasStation;
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }
}
