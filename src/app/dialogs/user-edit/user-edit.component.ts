import { UserService } from './../../services/user/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  userGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserEditComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.data.user;

    this.userGroup = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      username: [this.user.username, Validators.required],
      email: [this.user.email, Validators.required],
      cep: [this.user.cep, Validators.required],
      password: [this.user.password, Validators.required]
    });
  }


  confirmUpdate = (event: Event) => {
    event.preventDefault();
    const { name, username, email, cep, password } = this.userGroup.value;
    const updatedUser: User = { name, username, email, cep, password };

    this.userService.update(this.user.id, updatedUser)
      .then(() => {
        this.closeDialog();
      })
      .catch((err: HttpErrorResponse) => {
        console.log('Erro ao editar usuário', err);
      });
  }

  closeDialog = () => {
    this.dialogRef.close();
  }

  cancel = () => {
    this.closeDialog();
  }
}
