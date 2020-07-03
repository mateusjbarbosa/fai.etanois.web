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
    name: 'Posto Vasconcelos',
    address: 'Travessa da Luz n° 165 B: São Luís',
    cep: '65068-687',
    cnpj: '49.461.000/0001-88',
    email: 'posto@hotmail.com',
    phone_number: '(35)3473-1221',
    payment_card: 1234567898745632,
    password: '12345678',
    flag_of_fuel_station: 'Branca',
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
    console.log(this.post);
    this.postService.create(this.post).subscribe(() => {
      this.postService.showMessage('Posto criado com sucesso!')
      this.router.navigate(['/post'])
    })
  }
  cancel(): void {
    this.router.navigate(['/post'])
  }

}
