import { User } from './../../components/user/user.model';
import { Validacoes } from './../../components/validacoes';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/components/user/user.service';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';






@Component({
  selector: 'app-attendant-area-login',
  templateUrl: './attendant-area-login.component.html',
  styleUrls: ['./attendant-area-login.component.css']
})
export class AttendantAreaLoginComponent implements OnInit {
  login = {
    email: '',
    password: '',
  }
  formularioDeUsuario: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private hearderService: HeaderService,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.criarFormularioDeUsuario();

  }

  cancel(): void {
    this.router.navigate(['/'])
  }
  enviarDados() {
    const dadosFormulario = this.formularioDeUsuario.value;

    const usuario = (
      dadosFormulario.email,
      dadosFormulario.password
    );
    // alert(`O usuário ${usuario.nome} foi cadastrado com sucesso. \n Dados: ${JSON.stringify(usuario)}`);
    this.formularioDeUsuario.reset();
  }
  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group(
      {
        // email: ['', Validators.compose([Validators.email])],
        email: ['',],

        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ])
        ],
        // confirmarSenha: ['', Validators.compose([Validators.required])]
      },
      {
        // validator: Validacoes.SenhasCombinam
      }
    );
  }
   // Propriedades do formulário que vamos utilizar para obter os erros

  // get email() {
  //   return this.formularioDeUsuario.get('email');
  // }


  get password() {
    return this.formularioDeUsuario.get('password');
  }


  

  actionLogin(): void {
    this.userService.generateToken(this.login.email, this.login.password).subscribe(loginResponse => {
      sessionStorage.setItem('token', loginResponse.payload.token)
      sessionStorage.setItem('id', loginResponse.payload.id)
      console.log('token', loginResponse.payload.token)
      this.userService.readById(loginResponse.payload.id).subscribe(userResponse => {
        // console.log('userResponse: ', userResponse);
        // console.log('sessionStorage: ', sessionStorage);

        if (userResponse != null) {
          sessionStorage.setItem('usuarioLogado', JSON.stringify({ userResponse }))
          this.hearderService.setUsuarioLogado(userResponse);
          // console.log('userResponse: ', sessionStorage);
          this.router.navigate(['/post']);
        }

      })
    })

  }

}
