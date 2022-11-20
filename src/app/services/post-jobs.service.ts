// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import * as firebase from 'firebase/compat';
// import { map, Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { PostModel } from '../post-model';
// import { Database} from '@angular/fire/database'

// @Injectable({
//   providedIn: 'root'
// })
// export class PostJobsService {

//   constructor(private http: HttpClient) { }

// postJob(job: PostModel) {
//   this.http.post<PostModel>(`${environment.api}jobs.json`,job)
//   .subscribe((results) =>{
//       console.log(results);
      
//   })

// }

// getAllJobs(){
  
//   return this.http.get< {[key: string]: PostModel}>(`${environment.api}jobs.json`)
// .pipe(map((response) => {
//     const jobs = []
//     for(const key in response){
//       if(response.hasOwnProperty(key)){
//         jobs.push({...response[key], id:key})
//         }
//     }
//     console.log(jobs);
//     return jobs;
    
//   }))


// }

// deleteJob(id:string){
//   let url = 'https://job-listing-1a46a-default-rtdb.europe-west1.firebasedatabase.app/jobs/'
//   return this.http.delete(`${url}${id}.json`).subscribe()
// }

// deleteAllJobs(){
//   this.http.delete(`${environment.api}jobs.json`).subscribe()
// }

// }
