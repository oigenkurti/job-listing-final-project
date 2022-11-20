import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruiterHomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostJobsService } from '../post-jobs.service';
import { PostToEditComponent } from './post/post-to-edit/post-to-edit.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const recruiterRoutes: Routes = [
  {
    path: '',
    component: RecruiterHomeComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'post',
        component: PostComponent
      },
      {
        path: 'profile/post-to-edit/:id',
        component: PostToEditComponent,
        data:{id:''}

      }

    ],
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    RecruiterHomeComponent,ProfileComponent, PostComponent, PostToEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(recruiterRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PostJobsService],
})
export class RecruiterModule {}
