import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'recruiter_area',
    canActivate: [AuthGuardGuard],
    // canActivate: [AuthGuardGuard, AdminGuard],
    loadChildren: () =>
      import('./recruiter/recruiter.module').then((m) => m.RecruiterModule),
  },
  {
    path: 'jobseeker_area',
    canActivate: [AuthGuardGuard],
    // canActivate: [AuthGuardGuard, UserGuard],
    loadChildren: () =>
      import('./job-seeker/jobseeker.module').then((m) => m.JobseekerModule),
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
