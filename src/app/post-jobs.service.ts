import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostJobsService {

  constructor(private http: HttpClient) { }

postJob(job: PostModel) {
  this.http.post<PostModel>(`${environment.api}jobs.json`,job)
  .subscribe((results) =>{
      console.log(results);

  })

}
getOneJob(id:string){
  return this.http.get< {[key: string]: PostModel}>(`${environment.api}jobs/${id}.json`).pipe(map((response) => {
    const newValue = { ...response, id }
return newValue
  }))

}

getAllJobs(){
  return this.http.get< {[key: string]: PostModel}>(`${environment.api}jobs.json`)
.pipe(map((response) => {
    const jobs = []
    for(const key in response){
      if(response.hasOwnProperty(key)){
        jobs.push({...response[key], id:key})
        }
    }
    console.log(jobs);
    return jobs;

  }))


}

deleteJob(id:string){
  return this.http.delete(`${environment.api}jobs/${id}.json`).subscribe()
}

deleteAllJobs(){
  this.http.delete(`${environment.api}jobs.json`).subscribe()
}

updateJob(id:string, value:any){
  this.http.patch(`${environment.api}jobs/${id}.json`,value).subscribe()
}

}
