import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthServiceService } from 'src/app/auth-service.service';
import { JobSeekerService } from 'src/app/job-seeker.service';
import { PostModel } from 'src/app/post-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  openModal: boolean = false;
  selectedJobId: any;
  jobsAvailable: any[] = [];
  constructor(private jobSeekerApiService: JobSeekerService,private authService: AuthServiceService,  public afs: AngularFirestore) {}

  onOpenModal(id: string) {
    this.openModal = !this.openModal;
    this.selectedJobId = id;
  }

  hideModal(event: any) {
    this.openModal = event;
  }
  
  async ngOnInit(){
    this.jobSeekerApiService.getAllJob().subscribe((response: any) => {
      this.jobsAvailable = response
      console.log(response);
    });
  }
}
