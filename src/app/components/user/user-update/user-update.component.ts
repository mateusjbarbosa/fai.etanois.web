import { header_object } from 'src/app/authorization';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validacoes } from '../../validacoes';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  user: User;

  formularioDeUsuario: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  //na inicialização do meu componente, ja vai entrar e estar com os dados do usuario logado.
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.userService.readById(id).subscribe(user => {
      this.user = user;

      this.criarFormularioDeUsuario();
    });

    this.enviaUsuario(sessionStorage);

  }

  enviarDados() {
    const dadosFormulario = this.formularioDeUsuario.value;

    const usuario = (
      dadosFormulario.name,
      dadosFormulario.username,
      dadosFormulario.email,
      dadosFormulario.new_password,
      dadosFormulario.old_password
    );

    alert(`O usuário ${usuario.name} foi editado com sucesso. \n Dados: ${JSON.stringify(usuario)}`);
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

      new_password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      ],

      old_password: [
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
  get name() {
    return this.formularioDeUsuario.get('name');
  }
  get username() {
    return this.formularioDeUsuario.get('username');
  }
  get email() {
    return this.formularioDeUsuario.get('email');
  }
  get new_password() {
    return this.formularioDeUsuario.get('new_password');
  }
  get old_password() {
    return this.formularioDeUsuario.get('old_password');
  }


  updateUser(): void {
    this.userService.update(this.usuarioLogado).subscribe(() => {
      this.userService.showMessage('Usuario atualizado com sucesso!')
      this.router.navigate(['/post']);
    })
  }
  cancel(): void {
    this.router.navigate(['/post']);

  }

  @Input() usuarioLogado: User;
  enviaUsuario(user: Storage): void {
    this.usuarioLogado = JSON.parse(user["usuarioLogado"]);
    this.usuarioLogado = this.usuarioLogado["userResponse"]["payload"];
  }

}
