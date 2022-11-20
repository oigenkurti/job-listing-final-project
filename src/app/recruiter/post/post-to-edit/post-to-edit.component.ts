import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostJobsService } from 'src/app/post-jobs.service';
import { PostModel } from 'src/app/post-model';

@Component({
  selector: 'app-post-to-edit',
  templateUrl: './post-to-edit.component.html',
  styleUrls: ['./post-to-edit.component.scss']
})
export class PostToEditComponent implements OnInit {
oldId:any
oldTitle:any;
oldDescription:any;
oldSalary:any;
OldJobArray:any=[]
loadingValue: boolean = false;
hideEditButton: boolean = true;

editedJob = new UntypedFormGroup({
  title: new UntypedFormControl('',{validators:[Validators.required,Validators.maxLength(50)]}),
  description: new UntypedFormControl('',{validators:[Validators.required,Validators.maxLength(3000)]}),
  salary: new UntypedFormControl('',{validators:[Validators.required,Validators.max(1000000)]}),

})

editJob(job:PostModel){
this.jobServiceApi.updateJob(this.id,job)
this.loadingValue = true;
this.hideEditButton = false;
setTimeout(() => {
  this.loadingValue = false;
this.hideEditButton = true;
this.editedJob.reset()
}, 1500);
}

  constructor(public route: ActivatedRoute, private jobServiceApi: PostJobsService) { }
id:any
  ngOnInit(): void {
   this.id= this.route.snapshot.paramMap.get('id')
   console.log(this.id);
this.jobServiceApi.getOneJob(this.id).subscribe((response: any)=>{

  this.oldDescription=response.description
  this.oldSalary=response.salary
  this.oldTitle=response.title
  this.OldJobArray.push(this.oldDescription,this.oldSalary, this.oldTitle,);

})
    // this.route.queryParams.subscribe((params)=>{
    //   this.id = params
    //   console.log(this.id);


    // })
  }

}
