import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {

  constructor(private http: HttpClient) { }

  getAllJob(){
    return this.http.get< {[key: string]: PostModel}>(`${environment.api}jobs.json`)
    .pipe(map((response) => {
      console.log(response);
      
        const jobs = []
        for(const key in response){
          if(response.hasOwnProperty(key)){
            jobs.push({...response[key], id:key,jobseeker:response[key].job_seeker_name})
            }
        }
        console.log(jobs);
        return jobs;

      }))
    }

actionOnJob(id:string,newValue:PostModel){
  
  this.http.put(`${environment.api}jobs/${id}.json`,newValue).subscribe()
  // this.http.put(`${environment.api}jobs/${id}.json`,value).subscribe()
}

    getOneJob(id:string){
      return this.http.get< {[key: string]: PostModel}>(`${environment.api}jobs/${id}.json`).pipe(map((response) => {
        const newValue = { ...response, id }
    return newValue
      }))

    }

  }

