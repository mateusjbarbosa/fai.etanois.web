import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { Router } from '@angular/router';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private hearderService: HeaderService) { }

  ngOnInit(): void {
    this.enviaUsuario(sessionStorage);
  }

  @Input() usuarioLogado: User;
  enviaUsuario(user: Storage): void {
    this.usuarioLogado = JSON.parse(user["usuarioLogado"]);
    this.usuarioLogado = this.usuarioLogado["userResponse"]["payload"];
  }

  navegateDashboardAttendant(): void {
    this.router.navigate(['dashboard/attendant'])
  }
  navegateFuelCrud(): void {
    this.router.navigate(['dashboard/attendant'])
  }

}
