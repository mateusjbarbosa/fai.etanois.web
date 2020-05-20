import { PostService } from '../post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';


@Component({
  selector: 'app-post-read',
  templateUrl: './post-read.component.html',
  styleUrls: ['./post-read.component.css']
})
export class PostReadComponent implements OnInit {

  post: Post[]
  displayedColumns = ['id', 'name', 'cnpj', 'email', 'phone_number', 'payment_card'
    , 'password', 'address', 'cep', 'flag_of_fuel_station', 'openning_hours',
    'restaurant', 'car_wash', 'mechanical', 'action']

  constructor(private postService: PostService) { }


  ngOnInit(): void {
    this.postService.read().subscribe(post => {
      this.post = post
      console.log(post)
    })
  }

}