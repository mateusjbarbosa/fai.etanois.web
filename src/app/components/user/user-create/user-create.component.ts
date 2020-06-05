
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';





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
    name: undefined
    // cep: "",
    // search_distance_with_route: 15,
    // search_distance_without_route: 15,
    // payment_mode: "dinheiro",
    // phone_number: "(35)98524-1221",
    // role: "frentista",
    // etacoins: 10,
  }
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {

  }

  createUser(): void {
    this.userService.create(this.user).subscribe(() => {
      this.userService.showMessage('Usuário criado com sucesso!')
      this.router.navigate(['user-created-successfully'])
    })
  }
  cancel(): void {
    this.router.navigate(['/'])
  }
}
