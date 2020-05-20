import { PostService } from '../post.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post.model';



@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  post: Post = {
    name: 'Nome Posto',
    address: 'Avenida: , nº - Bairro',
    cep: '37540-000',
    cnpj: '12345678912345',
    email: 'posto@hotmail.com',
    phone_number: '(35)3473-1221',
    payment_card: 1234567898745632,
    password: '12345678',
    flag_of_fuel_station: 'mastercard',
    openning_hours: '24h',
    restaurant: false,
    car_wash: true,
    mechanical: false
  }
  constructor(private postService: PostService,
    private router: Router) { }

  ngOnInit(): void {

  }

  createPost(): void {
    this.postService.create(this.post).subscribe(() => {
      this.postService.showMessage('Posto criado com sucesso!')
      this.router.navigate(['/posts'])
    })
  }
  cancel(): void {
    this.router.navigate(['/posts'])
  }
}
