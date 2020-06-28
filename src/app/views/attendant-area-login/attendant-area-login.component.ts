import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/components/user/user.service';
import { HeaderService } from 'src/app/components/template/header/header.service';




@Component({
  selector: 'app-attendant-area-login',
  templateUrl: './attendant-area-login.component.html',
  styleUrls: ['./attendant-area-login.component.css']
})
export class AttendantAreaLoginComponent implements OnInit {
  login = {
    email: '',
    password: '',
    refresh: '',
  }

  constructor(private userService: UserService,
    private router: Router, private http: HttpClient, private hearderService:HeaderService) {

  }

  ngOnInit(): void {
   
  }

  cancel(): void {
    this.router.navigate(['/'])
  }

  actionLogin(): void {
    this.userService.generateToken(this.login.email, this.login.password).subscribe(loginResponse => {
      sessionStorage.setItem('token', loginResponse.payload.token)
      sessionStorage.setItem('id', loginResponse.payload.id)
      // console.log('login action', loginResponse)
      this.userService.readById(loginResponse.payload.id).subscribe(userResponse => {
        // console.log('userResponse: ', userResponse);

        if (userResponse != null) {
          sessionStorage.setItem('usuarioLogado', JSON.stringify({ userResponse }))
          this.hearderService.setUsuarioLogado(userResponse);
          this.router.navigate(['/post']); 
        }

      })
    })

  }
}
