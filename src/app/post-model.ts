export interface PostModel {
  id?:number;
  title:string;
  description: string;
  salary:number;
  favorite:false;
  applied:false;
  createByAdmin?:string;
  createBy?:string;
  job_seeker_name?:string
}
