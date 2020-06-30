import { header_object } from 'src/app/authorization';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

 

  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
//na inicialização do meu componente, ja vai entrar e estar com os dados do usuario logado.
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.userService.readById(id).subscribe(user => {
      this.user = user;
    });

    this.enviaUsuario(sessionStorage);
    
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
