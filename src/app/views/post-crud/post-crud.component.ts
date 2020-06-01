import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-post-crud',
  templateUrl: './post-crud.component.html',
  styleUrls: ['./post-crud.component.css']
})
export class PostCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Postos de Combustível',
      icon: ' local_gas_station',
      routeUrl: '/post'

    }
  }

  ngOnInit(): void {
  }

  navigateToPostCreate(): void {
    this.router.navigate(['/post/create'])
  }
}
