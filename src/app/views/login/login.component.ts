import { token } from './../../authorization';
import { UserService } from './../../components/user/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {
    email:'',
    password:''
  }

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  actionLogin(): void {
    this.userService.generateToken(this.login.email, this.login.password).subscribe(loginResponse=> {
      //this.userService.showMessage('Usuário criado com sucesso!')
      //this.router.navigate(['/user'])
      console.log(loginResponse)
    })
  }


}
