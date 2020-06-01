import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-created-successfully',
  templateUrl: './post-created-successfully.component.html',
  styleUrls: ['./post-created-successfully.component.css']
})
export class PostCreatedSuccessfullyComponent implements OnInit {

  user = {
    email:'',
    password:'',
    toke:''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
