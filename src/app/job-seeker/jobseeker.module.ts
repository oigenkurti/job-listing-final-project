import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { RouterModule,Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './profile/job-details/job-details.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const jobseekerRouters: Routes = [
  {
    path: '',
    component:HomeComponent,
    children:[
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'jobs',
        component: JobsComponent
      },

    ],
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  declarations: [HomeComponent,ProfileComponent, JobsComponent, JobDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(jobseekerRouters)
  ]
})
export class JobseekerModule { }
