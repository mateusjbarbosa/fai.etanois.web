import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from './../../services/user/user.service';
import { AuthService } from './../../services/auth/auth.service';
import { GasStationService } from './../../services/gas-station/gas-station.service';
import { FuelStation } from './../../models/gas-station.model';
import { User } from '../../models/user.model';

enum steps {
  login,
  gasStationChoose,
  gasStationAccessCode,
  gasStationRegister,
  gasStationRegisterDone,
  passwordRecover,
  passwordEmailSended
}

@Component({
  selector: 'app-attendant',
  templateUrl: './attendant.component.html',
  styleUrls: ['./attendant.component.css']
})
export class AttendantComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;

  currentGasStation: FuelStation;
  currentGasStationSub: Subscription;
  gasStations: FuelStation[] = [];
  gasStationsSub: Subscription;

  loginGroup: FormGroup;
  passwordRecoverGroup: FormGroup;
  gasStationLoginGroup: FormGroup;
  gasStationRegisterGroup: FormGroup;

  currentStep: steps = 0;
  authError = false;

  createError = false;
  createErrorMessage: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private gasStationService: GasStationService
  ) { }

  ngOnInit(): void {
    this.loginGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.passwordRecoverGroup = this.formBuilder.group({
      email: ['', Validators.required],
    });

    this.gasStationLoginGroup = this.formBuilder.group({
      accessCodeField1: ['', Validators.required],
      accessCodeField2: ['', Validators.required],
      accessCodeField3: ['', Validators.required]
    });

    this.gasStationRegisterGroup = this.formBuilder.group({
      name: ['', Validators.required],
      flag: ['', Validators.required],
      cnpj: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      uf: ['', Validators.required],
      zip: ['', Validators.required],
      openTime: ['', Validators.required],
      closeTime: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.userSub = this.userService.userChange.subscribe((user: User) => {
      this.user = user;
    });

    this.gasStationsSub = this.gasStationService.gasStationsChange.subscribe((gasStations: FuelStation[]) => {
      this.gasStations = gasStations;
    });

    this.currentGasStationSub = this.gasStationService.currentGasStationChange.subscribe((currentGasStation: FuelStation) => {
      this.currentGasStation = currentGasStation;
    });

    if (this.userService.getUser()) {
      this.currentStep = steps.gasStationChoose;
      this.user = this.userService.getUser();
      this.gasStations = this.gasStationService.getGasStations();
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.gasStationsSub.unsubscribe();
    this.currentGasStationSub.unsubscribe();
  }

  back = () => {
    switch (this.currentStep) {
      case 1:
      case 5:
      case 6:
        this.currentStep = steps.login;
        break;
      case 2:
        this.currentGasStation = undefined;
        break;
      case 3:
      case 4:
        this.currentStep = steps.gasStationChoose;
        break;
    }
  }

  submitLogin = (event: Event) => {
    this.authError = false;
    event.preventDefault();
    if (!this.loginGroup.valid) { return; }
    const { username, password } = this.loginGroup.value;
    this.authService.doLogin(username, password)
      .then((userId: number) => {
        this.userService.getUserById(userId);
        return userId;
      })
      .then((userId: number) => {
        return this.gasStationService.getGasStationsByUserId();
      })
      .then(() => {
        this.currentStep = steps.gasStationChoose;
      })
      .catch((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authError = true;
        }
      });
  }

  accessCode = (gasStation: FuelStation) => {
    this.gasStationService.setCurrentGasStation(gasStation);
    this.currentStep = steps.gasStationAccessCode;
  }

  submitGasLogin = (event: Event) => {
    event.preventDefault();
    if (!this.gasStationLoginGroup.valid) { return; }
    // Depois colocar a validação dessa senha de postos que ainda não está pronta

    this.router.navigate(['management']);
  }

  submitGasRegister = (event: Event) => {
    event.preventDefault();
    if (!this.gasStationRegisterGroup.valid) { return; }
    // Montar o pacote certo para ser criado pois falta algumas informações
    const { name, flag, cnpj, street, streetNumber, neighborhood,
      city, uf, zip, openTime, closeTime, phone } = this.gasStationRegisterGroup.value;

    const newGasStation: FuelStation = {
      name,
      cnpj,
      street,
      street_number: streetNumber,
      neighborhood,
      cep: zip,
      time_to_open: openTime,
      time_to_close: closeTime
    };

    this.gasStationService.create(newGasStation)
      .then((res) => {
        this.currentStep = steps.gasStationRegisterDone;
        // this.gasStationService.getGasStationsByUserId(this.user.id); // USAR PARA ATUALIZAR A LISTA DE POSTOS
      })
      .catch((err: HttpErrorResponse) => {
        this.createErrorMessage = err.message;
      });
  }

  initGasStationRegister = () => {
    this.currentStep = steps.gasStationRegister;
  }

  recoverPasswordInit = () => {
    this.currentStep = steps.passwordRecover;
  }

  submitRecoverPassword = (event: Event) => {
    event.preventDefault();

    if (!this.passwordRecoverGroup.valid) { return; }
    const { email } = this.passwordRecoverGroup.value;
    this.userService.recoverPassword(email)
      .then((res) => {
        this.currentStep = steps.passwordEmailSended;
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  getErrorMessage = () => {
    if (this.loginGroup.hasError('required')) {
      return 'Digite um valor.';
    } else if (this.gasStationLoginGroup.hasError('required')) {
      return 'Usuário ou senha incorretos';
    } else if (this.authError) {
      return 'Usuário ou senha incorretos';
    }
  }
}
