import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendant-area-login',
  templateUrl: './attendant-area-login.component.html',
  styleUrls: ['./attendant-area-login.component.css']
})
export class AttendantAreaLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['/'])
  }

}
