import { Router } from '@angular/router';
import { GasStationServices } from './../../models/services.model';
import { UserService } from './../../services/user/user.service';
import { GasStationService } from './../../services/gas-station/gas-station.service';
import { Fuel } from './../../models/fuel.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuelAddEditComponent } from '../../dialogs/fuel-add-edit/fuel-add-edit.component';
import { FuelDeleteComponent } from '../../dialogs/fuel-delete/fuel-delete.component';
import { User } from '../../models/user.model';
import { FuelStation } from '../../models/gas-station.model';
import { Subscription } from 'rxjs';

enum menus {
  fuelManagement,
  servicesManagement,
  attendantManagement,
}

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit, OnDestroy {
  public user: User;
  public currentGasStation: FuelStation;
  private userSub: Subscription;
  private currentGasStationSub: Subscription;

  public activeMenu: menus;
  private availableFuels: Fuel[] = [];
  private availableServices: GasStationServices[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private gasStationService: GasStationService,
  ) { }

  ngOnInit(): void {
    this.activeMenu = menus.fuelManagement;

    this.userSub = this.userService.userChange.subscribe((user: User) => {
      this.user = user;
    });

    this.currentGasStationSub = this.gasStationService.currentGasStationChange.subscribe((gasStation: FuelStation) => {
      this.currentGasStation = gasStation;
      this.availableFuels = gasStation.available_fuels;
    });

    this.user = this.userService.getUser();
    this.currentGasStation = this.gasStationService.getCurrentGasStation();
    this.availableFuels = this.currentGasStation.available_fuels;

    if (this.currentGasStation.restaurant) {
      this.availableServices.push({
        id: 1,
        name: 'Restaurante',
        start: this.currentGasStation.time_to_open,
        end: this.currentGasStation.time_to_close
      });
    }

    if (this.currentGasStation.car_wash) {
      this.availableServices.push({
        id: 2,
        name: 'Lava-jato',
        start: this.currentGasStation.time_to_open,
        end: this.currentGasStation.time_to_close
      });
    }

    if (this.currentGasStation.mechanical) {
      this.availableServices.push({
        id: 3,
        name: 'Borracharia',
        start: this.currentGasStation.time_to_open,
        end: this.currentGasStation.time_to_close
      });
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.currentGasStationSub.unsubscribe();
  }

  deleteFuel = (fuelName: string, fuelId: number) => {
    const dialogRef = this.dialog.open(FuelDeleteComponent, {
      data: {
        fuelName,
        fuelId
      }
    });
  }

  editFuel = (fuel: Fuel) => {
    const dialogRef = this.dialog.open(FuelAddEditComponent, {
      data: {
        fuel
      }
    });
  }

  addFuel = () => {
    const dialogRef = this.dialog.open(FuelAddEditComponent);
  }

  changeMenu = (menuId: number) => {
    this.activeMenu = menuId;
  }

  backToGasStationChoose = () => {
    this.gasStationService.clearCurrentGasStation();
    this.router.navigate(['/attendant']);
  }
}
