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
    console.log(this.login.email, this.login.password)
    this.userService.generateToken(this.login.email, this.login.password).subscribe(loginResponse=> {
      //this.userService.showMessage('Usuário criado com sucesso!')
      //this.router.navigate(['/user'])
      
      sessionStorage.setItem('token', loginResponse.payload.token)
      sessionStorage.setItem('id', loginResponse.payload.id)
      console.log('login action', loginResponse)
     /* sessionStorage.setItem('usuario', JSON.stringify({nome: "Gui"})) // insere um object json na sessão da applicação
      var u = sessionStorage.getItem('usuario') // resgata o objecto setado na sessão da aplicação
      console.log(JSON.parse(u).nome) // sintaxe de conversão de string para ocject json
    
      console.log(loginResponse)

      console.log('o token da sessão é', loginResponse.payload.token)*/
      //this.readUser();
      
    })

    
  }

  readUser(): void {
    this.userService.readById(4).subscribe(userResponse=> {
      console.log(userResponse)
    })
  }


}
