import { Component, OnInit } from '@angular/core';
import { JobSeekerService } from 'src/app/job-seeker.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  allAppliedJobs: any = [];
  allFavoriteJobs: any = [];
  jobSeekerName: any;
  constructor(private jobSeekerApiService: JobSeekerService) {}

  getAppliedJobs() {
    this.jobSeekerApiService.getAllJob().subscribe((response) => {
      for (let index = 0; index < response.length; index++) {
        // console.log(response[index].favorite);
      }

      for (let index = 0; index < response.length; index++) {
        if (
          response[index].applied &&
          response[index].job_seeker_name === this.jobSeekerName
        ) {
           this.allAppliedJobs.push(response[index]);
        }
      }
    });
  }

  getFavoriteJobs() {
    this.jobSeekerApiService.getAllJob().subscribe((response) => {
      for (let index = 0; index < response.length; index++) {
        if (
          response[index].favorite &&
          response[index].job_seeker_name === this.jobSeekerName
        ) {
           this.allFavoriteJobs.push(response[index]);
        }
        
      }
    });
  }

  ngOnInit(): void {
    this.jobSeekerName = localStorage.getItem('userName');
    this.getAppliedJobs();
    this.getFavoriteJobs()
    console.log(this.allFavoriteJobs);
    
  }
}
