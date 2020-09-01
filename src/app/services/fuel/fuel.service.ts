import { BASE_URL } from './../../utils/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Fuel } from '../../models/fuel.model';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  fuelGetPath = 'fuel/';
  fuelCreatePath = 'fuel/new/';

  constructor(
    private http: HttpClient
  ) { }

  public delete = async (fuelId: number) => {
    await this.http.delete(BASE_URL + this.fuelGetPath + fuelId)
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err: HttpErrorResponse) => {
        throw err;
      });
  }

  public create = async (fuel: Fuel) => {
    await this.http.patch(BASE_URL + this.fuelCreatePath, fuel)
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err: HttpErrorResponse) => {
        throw err;
      });
  }

  public update = async (fuelId: number, fuel: Fuel) => {
    await this.http.patch(BASE_URL + this.fuelGetPath + fuelId, fuel)
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err: HttpErrorResponse) => {
        throw err;
      });
  }
}
