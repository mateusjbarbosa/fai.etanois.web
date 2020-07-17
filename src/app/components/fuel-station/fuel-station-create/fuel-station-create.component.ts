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
    email: undefined,
    phone_number: undefined,
    payment_card: undefined,
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
  emailError: string = '';
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
      dadosFormulario.address,
      dadosFormulario.cep,
      dadosFormulario.email,
      dadosFormulario.payment_card
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

      cep: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
        ])],

      email: ['', Validators.compose([Validators.email])],

      phone_number: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11)
        ])],

        payment_card: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(16),
            Validators.maxLength(16)
          ])],
  



    });
  }



  createFuelStation(): void {
    this.fuelStationService.create(this.fuelStation).subscribe(
      res => {
        console.log('HTTP response', res);
        this.fuelStationService.showMessage('Posto criado com sucesso!')
        this.router.navigate(['post/created/successfully'])
      },
      err => {
        console.log('error: ', err);
        if (err.error.msg[0] === 'E-mail is already in use') {
          this.emailError = 'Esse e-mail já está cadastrado!';
          this.fuelStationService.errorHandler('Erro!');
        }
      },
      () => console.log('HTTP request completed.')

    );
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

  get cep() {
    return this.formulario.get('cep');
  }
  get email() {
    return this.formulario.get('email');
  }
  get phone_number() {
    return this.formulario.get('phone_number');
  }
  get payment_card() {
    return this.formulario.get('payment_card');
  }

  //regras de negócio do component
  maskCnpj: string;
  cnpjMask() {
    const value = this.formulario.get('cnpj').value;
    // console.log(value, value.length, this.formularioForm)
    if (value.length <= 14) {
      this.maskCnpj = '00.000.000/0000-00'
    }
  }

  maskCep: string;
  cepMask() {
    const value = this.formulario.get('cep').value;
    // console.log(value, value.length, this.formularioForm)
    if (value.length <= 8) {
      this.maskCep = '00.000-000'
    }

  }

  maskPhone: string;
  phoneNumberMask() {
    const value = this.formulario.get('phone_number').value;
    // console.log(value, value.length, this.formularioForm)
    if (value.length < 11) {
      this.maskPhone = '(00)0000-0000'
    }else if(value.length >= 11){
      this.maskPhone = '(00)00000-0000'
    }

  }

  maskPaymentCard: string;
  PaymentCardMask(){
    const value = this.formulario.get('payment_card').value;
    // console.log(value, value.length, this.formularioForm)
    if (value.length <= 16) {
      this.maskPaymentCard = '0000.0000.0000.0000'
    }

  }


}
