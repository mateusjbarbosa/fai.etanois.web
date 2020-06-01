import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-area-login',
  templateUrl: './manager-area-login.component.html',
  styleUrls: ['./manager-area-login.component.css']
})
export class ManagerAreaLoginComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  
  cancel(): void {
    this.router.navigate(['/'])
  }
}
