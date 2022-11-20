import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PostJobsService } from 'src/app/post-jobs.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  loadingValue: boolean = false;
  hidePostButton: boolean = true;

jobForm = new UntypedFormGroup({
  title: new UntypedFormControl('',{validators:[Validators.required,Validators.maxLength(50)]}),
  description: new UntypedFormControl('',{validators:[Validators.required,Validators.maxLength(3000)]}),
  salary: new UntypedFormControl('',{validators:[Validators.required,Validators.max(1000000)]}),

})

  constructor(private jobsApiService: PostJobsService) { }

postNewJob(){
  const username = localStorage.getItem('userName')
  this.jobsApiService.postJob({...this.jobForm.value, createBy: username,applied:false,favorite:false});
  this.loadingValue = true;
  this.hidePostButton = false;
  setTimeout(() => {
        this.jobForm.reset()
        this.loadingValue = false;
        this.hidePostButton = true;
  }, 1500);
}

  ngOnInit() {

  }

}
