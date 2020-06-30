
import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { header_object } from 'src/app/authorization';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  user: User


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.readById(id).subscribe(user => {
      this.user = user;
    });
    this.enviaUsuario(sessionStorage);
  }

  deleteUser(): void {
    console.log(this.usuarioLogado.id)
    this.userService.delete(this.usuarioLogado.id).subscribe(() => {
      this.userService.showMessage('Usuário Excluido com sucesso!')
      this.router.navigate(['']);
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
