import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,AfterViewInit,AfterContentInit {

  showButton:boolean =false

  constructor(private user: AuthServiceService,private route:Router) { }

logOut(){
  this.user.logout()
  // this.showButton = true
  setTimeout(() => {
    location.reload()
  }, 1200);
  this.route.navigate(['/'])

}


async ngAfterViewInit() {
  if(await this.user.isUserLogedIn() ){
  
    this.showButton = true;
  }else{
  
    this.showButton = false;
  }
}

async ngAfterContentInit() {
  if(await this.user.isUserLogedIn() ){
  
    this.showButton = true;
  }else{
  
    this.showButton = false;
  }
}
  async ngOnInit() {
  }

    

}
