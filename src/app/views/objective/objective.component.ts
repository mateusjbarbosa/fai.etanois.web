import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit {
 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  actionButton(): void {
    this.router.navigate(['attendant-area-login']);
  }

}
