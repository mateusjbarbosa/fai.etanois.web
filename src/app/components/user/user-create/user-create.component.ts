
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';






@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {
    username: undefined,
    email: undefined,
    password: undefined,
    new_password: undefined,
    old_password: undefined,
    name: undefined
    // cep: "",
    // search_distance_with_route: 15,
    // search_distance_without_route: 15,
    // payment_mode: "dinheiro",
    // phone_number: "(35)98524-1221",
    // role: "frentista",
    // etacoins: 10,
  }

  emailError: string = '';
  userNameError: string = '';
  // Aqui damos um nome para nosso formulário
  // E ele precisa ser do tipo FormGroup
  formularioDeUsuario: FormGroup;
  // Via DI, nós obtemos o FormBuilder.
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.criarFormularioDeUsuario();

  }

  enviarDados() {
    const dadosFormulario = this.formularioDeUsuario.value;
    const usuario = (
      dadosFormulario.name,
      dadosFormulario.username,
      dadosFormulario.email,
      dadosFormulario.password
    );
    alert(`O usuário ${usuario.name} foi cadastrado com sucesso. \n Dados: ${JSON.stringify(usuario)}`);
    this.formularioDeUsuario.reset();
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      name: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ])],

      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ])],

      email: ['', Validators.compose([Validators.email])],
      
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      ],
    });
  }

  createUser(): void {
    // this.userService.verifyExistenceCredentials(this.user.email).subscribe(() =>{
    //   console.log(error);
    // });

    this.userService.create(this.user).subscribe(
      res => console.log('HTTP response', res),
      err => {
        console.log('error: ', err);

        if (err.error.msg[0] === 'E-mail is already in use') {
          this.emailError = 'Esse e-mail já está cadastrado!';
        }else if(err.error.msg[0] === 'Username is already in use'){
          this.userNameError = 'Esse apelido já está cadastrado!';
        }
        // this.userService.showMessage(err.error.msg[0], true);
      },
      () => console.log('HTTP request completed.')
  );

    // this.userService.create(this.user).subscribe(() => {
    //   this.userService.showMessage('Usuário criado com sucesso!')
    //   this.router.navigate(['user-created-successfully'])
    // })
  }
  cancel(): void {
    this.router.navigate(['/'])
  }

  // Propriedades do formulário que vamos utilizar para obter os erros
  get name() {
    return this.formularioDeUsuario.get('name');
  }
  get username() {
    return this.formularioDeUsuario.get('username');
  }

  get email() {
    return this.formularioDeUsuario.get('email');
  }

  get password() {
    return this.formularioDeUsuario.get('password');
  }
}
