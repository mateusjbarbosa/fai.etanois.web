import { GasStationService } from './../gas-station/gas-station.service';
import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './../auth/auth.service';
import { BASE_URL } from './../../utils/constants';
import { User } from './../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userGetPath = 'user/';
  userCreatePath = 'user/new';

  @Input()
  public user: User;

  @Output()
  public userChange: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private gasStationService: GasStationService
  ) { }

  public getUser = () => {
    return this.user;
  }

  public setUser = (user: User) => {
    this.user = user;
    this.userChange.emit(this.user);
  }

  public clearUser = () => {
    this.gasStationService.clearGasStation();
    this.user = undefined;
    this.userChange.emit(this.user);
  }

  public create = async (user: User) => {
    return await this.http.post(BASE_URL + this.userCreatePath, user, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  public update = async (userId, user: User) => {
    return await this.http.patch(BASE_URL + this.userGetPath + userId, user, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  public delete = async (userId: number) => {
    return await this.http.delete(BASE_URL + this.userGetPath + userId, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((res) => {
        this.getUserById(userId);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  public getUserById = async (id: number) => {
    return await this.http.get(BASE_URL + this.userGetPath + id, { headers: this.authService.getHeaders() })
      .toPromise()
      .then((user: { payload: User }) => {
        this.setUser(user.payload);
        return;
      })
      .catch((err) => {
        throw err;
      });
  }
}
