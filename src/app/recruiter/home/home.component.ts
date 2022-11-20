import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class RecruiterHomeComponent implements OnInit {
  logedInUser:any
  constructor() { }

  ngOnInit() {
this.logedInUser = localStorage.getItem('userName')
  }

}
