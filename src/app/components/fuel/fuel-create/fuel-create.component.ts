import { FuelService } from './../fuel.service';
import { Component, OnInit } from '@angular/core';
import { Fuel } from '../fuel.model';

@Component({
  selector: 'app-fuel-create',
  templateUrl: './fuel-create.component.html',
  styleUrls: ['./fuel-create.component.css']
})
export class FuelCreateComponent implements OnInit {
  [x: string]: any;

  fuel: Fuel = {
    name: undefined,

  }

  constructor() { }

  ngOnInit(): void {
  }

  createFuel(): void {
    this.fuelService.create(this.fuel).subscribe(
      res => {
        console.log('HTTP response', res);
        this.fuelService.showMessage('Combuustível criado com sucesso!');
        // this.router.navigate(['user/created/successfully']);
      },
      err => {
        console.log('error: ', err);
        this.userService.errorHandler('Erro!');

        // if (err.error.msg[0] === 'E-mail is already in use') {
        //   this.emailError = 'Esse e-mail já está cadastrado!';
        //   this.userService.errorHandler('Erro!');
        // } else if (err.error.msg[0] === 'Username is already in use') {
        //   this.userNameError = 'Esse apelido já está cadastrado!';
        //   this.userService.errorHandler('Erro!');
        // }
      },
      () => console.log('HTTP request completed.')
    );
  }
  cancel(): void {
    // this.router.navigate(['/'])
  }

}
