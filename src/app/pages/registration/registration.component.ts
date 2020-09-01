import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from './../../services/user/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerGroup: FormGroup;
  registerError = false;
  registrationDone = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.registerGroup = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      cep: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitRegister = (event: Event) => {
    this.registerError = false;
    event.preventDefault();
    if (!this.registerGroup.valid) { return; }

    const { name, username, email, cep, password } = this.registerGroup.value;
    const newUser: User = { name, username, email, cep, password };
    this.userService.create(newUser)
      .then(() => {
        this.registrationDone = true;
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.registerError = true;
      });
  }

  getErrorMessage = () => {
    if (this.registerGroup.hasError('required')) {
      return 'Digite um valor.';
    } else if (this.registerError) {
      return 'Ocorreu um erro ao criar usuário.';
    }
  }

}
