import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { JobSeekerService } from 'src/app/job-seeker.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  @Output() deactivateModal = new EventEmitter();
  hideModal: boolean = true;
  applied: boolean = false;
  favorite: boolean = false;
  @Input() jobId: any;
  jobDetails: any;
  appliedValue:boolean = false
  favoriteValue:boolean = false
 jobSeekerPosts:any
 loadingValueApplying: boolean = false;
hideApplyButton: boolean = true;
loadingValueFavorite:boolean = false;
hideFavoriteButton:boolean = true
  constructor(private jobSeekerApiService: JobSeekerService) {

  }

  closeModal() {
    this.hideModal = false;
    this.deactivateModal.emit(this.hideModal);
  }

apply(){ 
  this.jobSeekerApiService.actionOnJob(this.jobId,{...this.jobDetails,applied:!this.applied,job_seeker_name:this.jobSeekerPosts})
  this.loadingValueApplying = true;
this.hideApplyButton = false;
setTimeout(() => {
  this.loadingValueApplying = false;
this.hideApplyButton = true;
}, 1900);
setTimeout(() => {
  this.deactivateModal.emit(!this.hideModal);
}, 2000);
}

favoriteJob(){
  this.jobSeekerApiService.actionOnJob(this.jobId,{...this.jobDetails,favorite:!this.favorite,job_seeker_name:this.jobSeekerPosts})
  this.loadingValueFavorite = true;
this.hideFavoriteButton = false;
setTimeout(() => {
  this.loadingValueFavorite = false;
this.hideFavoriteButton = true;
}, 1900);
setTimeout(() => {
  this.deactivateModal.emit(!this.hideModal);
}, 2000);
}

  async ngOnInit() {
    this.jobSeekerPosts = localStorage.getItem('userName')    
    setTimeout(() => {
      lastValueFrom(this.jobSeekerApiService.getOneJob(this.jobId)).then(
        (data) => {
          this.jobDetails = data;
          console.log(this.jobDetails);
        }
      );
    }, 500);
  }

}
