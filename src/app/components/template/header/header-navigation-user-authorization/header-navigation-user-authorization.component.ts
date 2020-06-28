import { User } from './../../../user/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';



@Component({
  selector: 'app-header-navigation-user-authorization',
  templateUrl: './header-navigation-user-authorization.component.html',
  styleUrls: ['./header-navigation-user-authorization.component.css']
})

export class HeaderNavigationUserAuthorizationComponent implements OnInit {
  
  
  constructor(private router: Router, private hearderService:HeaderService) { }

  ngOnInit(): void {
    this.enviaUsuario(sessionStorage);
  }
  logout(): void {
    sessionStorage.removeItem('usuarioLogado');
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.hearderService.setUsuarioLogado(null);
    this.router.navigate(['/']);
  }

  @Input() usuarioLogado: User;
  @Input() userName: String;
  enviaUsuario(user):void{
    this.usuarioLogado = JSON.parse(user["usuarioLogado"]);
    this.usuarioLogado = this.usuarioLogado["userResponse"]["payload"];
    this.userName = this.usuarioLogado.name;
    console.log(this.usuarioLogado);  
  }
}
