import { FuelNames } from './../../utils/constants';
import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { FuelStation } from './../../models/gas-station.model';
import { BASE_URL } from '../../utils/constants';
import { Fuel } from '../../models/fuel.model';

@Injectable({
  providedIn: 'root'
})
export class GasStationService {
  private gasStationGetPath = 'fuel_station/';
  private gasStationGetUserPath = 'fuel_station/read-by-user/1';
  private gasStationCreatePath = 'fuel_station/new';
  private AVAILABLE_FUEL_URL = '/available-fuel';

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

  clearCurrentGasStation = () => {
    this.currentGasStation = undefined;
    this.currentGasStationChange.emit(this.currentGasStation);
  }

  getGasStations = (): FuelStation[] => {
    return this.gasStations;
  }

  setGasStations = (gasStation: FuelStation[]) => {
    this.gasStations = gasStation;
    this.gasStationsChange.emit(this.gasStations);
  }

  clearGasStation = () => {
    this.currentGasStation = undefined;
    this.gasStations = [];
    this.gasStationsChange.emit(this.gasStations);
    this.currentGasStationChange.emit(this.currentGasStation);
  }

  getGasStationsByUserId = async () => {
    return await this.http.get(BASE_URL + this.gasStationGetUserPath, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res: { payload: { count: number, fuel_stations: FuelStation[] } }) => {
        console.log(res);
        this.setGasStations(res.payload.fuel_stations);
        return res.payload;
      })
      .catch((err) => {
        throw err;
      });
  }

  saveAvailableFuels = async (fuel: string, price: number) => {
    const newAvailableFuels = {
      available_fuels: [
        ...this.currentGasStation.available_fuels.filter((value) => value.fuel !== fuel),
        {
          fuel,
          price,
        }]
    };
    return await this.http.post(
      BASE_URL + this.gasStationGetPath + this.currentGasStation.id + this.AVAILABLE_FUEL_URL,
      newAvailableFuels,
      { headers: this.authService.getHeaders() }
    )
      .toPromise()
      .then((res: { payload: { available_fuels: Fuel[] } }) => {
        this.currentGasStation.available_fuels = res.payload.available_fuels;
        this.currentGasStationChange.emit(this.currentGasStation);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteAvailableFuels = async (fuel: string) => {
    const newAvailableFuels = {
      available_fuels: [...this.currentGasStation.available_fuels.filter((value) => value.fuel !== fuel)]
    };
    return await this.http.post(
      BASE_URL + this.gasStationGetPath + this.currentGasStation.id + this.AVAILABLE_FUEL_URL,
      newAvailableFuels,
      { headers: this.authService.getHeaders() }
    )
      .toPromise()
      .then((res: { payload: { available_fuels: Fuel[] } }) => {
        this.currentGasStation.available_fuels = res.payload.available_fuels;
        this.currentGasStationChange.emit(this.currentGasStation);
        return res;
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
  }

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
