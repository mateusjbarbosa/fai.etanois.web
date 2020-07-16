import { FuelStationService } from './../fuel-state.service';
import { FuelStation } from './../fuel_station.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fuel-station-create',
  templateUrl: './fuel-station-create.component.html',
  styleUrls: ['./fuel-station-create.component.css']
})
export class FuelStationCreateComponent implements OnInit {

  fuelStation: FuelStation = {
    name: undefined,
    cnpj: undefined,
    flag_of_fuel_station: undefined,
    address: undefined,
    cep: undefined,
    // email: 'posto@hotmail.com',
    // phone_number: '(35)3473-1221',
    // payment_card: 1234567898745632,
    // password: '12345678',
    // openning_hours: '24h',
    // restaurant: false,
    // car_wash: true,
    // mechanical: false
  }

  // Aqui damos um nome para nosso formulário
  // E ele precisa ser do tipo FormGroup
  formulario: FormGroup;
  // Via DI, nós obtemos o FormBuilder.
  constructor(
    private fuelStationService: FuelStationService,
    private router: Router,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.criarFormularioDeUsuario();
  }

  enviarDados() {
    const dadosFormulario = this.formulario.value;
    const usuario = (
      dadosFormulario.name,
      dadosFormulario.cnpj,
      dadosFormulario.flag_of_fuel_station,
      dadosFormulario.address
    );
    // alert(`O usuário ${usuario.name} foi cadastrado com sucesso. \n Dados: ${JSON.stringify(usuario)}`);
    // this.formulario.reset();
  }

  criarFormularioDeUsuario() {
    this.formulario = this.fb.group({
      name: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ])],

      cnpj: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ])],

      flag_of_fuel_station: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      ],
      address: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50)
        ])],

    });
  }



  createFuelStation(): void {
    console.log(this.fuelStation);
    this.fuelStationService.create(this.fuelStation).subscribe(() => {
      this.fuelStationService.showMessage('Posto criado com sucesso!')
      this.router.navigate(['post/created/successfully'])
    })
  }
  cancel(): void {
    this.router.navigate(['/post'])
  }

  // Propriedades do formulário que vamos utilizar para obter os erros
  get name() {
    return this.formulario.get('name');
  }
  get cnpj() {
    return this.formulario.get('cnpj');
  }

  get flag_of_fuel_station() {
    return this.formulario.get('flag_of_fuel_station');
  }

  get address() {
    return this.formulario.get('address');
  }

  //regras de negócio do component
  mask: string;

  cnpjmask() {
    const value = this.formulario.get('cnpj').value;
    // console.log(value, value.length, this.formularioForm)
    if (value.length <= 14) {
      this.mask = '00.000.000/0000-00'
    }
    else {
      this.mask = '00.000.0000-00'
    }
  }


}
