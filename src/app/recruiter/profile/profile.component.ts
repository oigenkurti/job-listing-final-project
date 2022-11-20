import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostJobsService } from 'src/app/post-jobs.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
openModal:boolean = false
loadingValue: boolean = false;
hideDeleteButton: boolean = true;
  constructor(private jobsApiService: PostJobsService, private activatedRouter: ActivatedRoute,private router:Router ) { }

  openJobDeletionModal(){
this.openModal = true
  }
  closeJobDeletionModal(){
this.openModal = false

  }
  deleteAllJob(){
  const username = localStorage.getItem('userName')
this.jobsApiService.deleteAllJobs()
setTimeout(() => {
  this.openModal = false
}, 2000);
  }
myJobs: any = []
username:any
  deleteJob(id:string){
  this.jobsApiService.deleteJob(id);
  this.loadingValue = true;
  this.hideDeleteButton = false;
  setTimeout(() => {
    this.loadingValue = false;
  this.hideDeleteButton = true;

  }, 1900);
  setTimeout(() => {
    
    location.reload()
  }, 2000);
  }



getMyJobs(){

  this.jobsApiService.getAllJobs().subscribe((postedJobs)=>{
    for (let index = 0; index < postedJobs.length; index++) {
      if(postedJobs[index].createBy === this.username){
        
        this.myJobs.push(postedJobs[index])
        console.log('==============');
        console.log(this.myJobs);
        console.log('=============='); 
      }
      
    
    }
    

  
  })
}

  ngOnInit(): void {
  this.username = localStorage.getItem('userName')

    this.getMyJobs()

}

  }

