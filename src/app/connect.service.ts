import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConnectService {

  constructor(private http: HttpClient) {}

  url = "http://localhost:8000/api/";
  token = localStorage.getItem('token');

  private adminPicSubject = new BehaviorSubject<string | null>(null); // This will store the admin image URL
  adminPic$ = this.adminPicSubject.asObservable();
  // id = localStorage.getItem('id'); 

  login(data:any){
    return this.http.post(this.url + 'login',data);
  }

  logout(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'logout', {}, { headers });
  }

  // submitAnnouncement(announcementData:any){
  //   return this.http.post(this.url + 'announcements', announcementData) 
  // }

  // getannouncement(){
  //   return this.http.get(this.url + 'announcements');
  // }
 
  // getclasses(){
  //   return this.http.get(this.url + 'getclasses');
  // }

  getclasses() {
    const id = localStorage.getItem('admin_id');
    return this.http.get(this.url + 'getclasses/' + id);
  }
  
  getClassesToday(){
    const id = localStorage.getItem('admin_id');
    return this.http.get(this.url + 'getClassesToday/' + id);
  }

  getClassInfo(cid: any){
    return this.http.get(this.url + 'getClassInfo/' + cid);
  }

  getClassGrades(cid: any){
    return this.http.get(this.url + 'getClassGrades/' + cid);
  }

  updateClassGrades(cid: string, payload: any) {
  return this.http.post(this.url + 'updateClassGrades/' + cid, payload);
  }

  // saveAttendance(cid: string, payload: any) {
  //   return this.http.post(this.url + 'updateClassGrades/' + cid, payload);
  //   }

  getClassAttendance(cid: any){
    return this.http.get(this.url + 'getClassAttendance/' + cid);
  }

  updateClassAttendance(cid: string, payload: any) {
    return this.http.post(this.url + 'updateClassAttendance/' + cid, payload);
    }

  getProfile(id:any){
    const headers = {'Authorization': 'Bearer'+ this.token};  
    return this.http.get(`${this.url}/Account/${id}`,{headers});
  }

  //account
  update(adminId: number, oldPassword: string, newData: any): Observable<any> {
    return this.http.put(`${this.url}update-password`, {
      admin_id: adminId,
      oldPassword: oldPassword,
      ...newData
    });
  }
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8000/api/upload-image', formData);
  }
  updateAdminPic(newImageUrl: string) {
    this.adminPicSubject.next(newImageUrl); // Emit new image URL
  } 

  getClassAnnouncements(cid: any){
    return this.http.get(this.url + 'getClassAnnouncements/' + cid);
  }
  



  // announcement 
  // getannouncement(): Observable<any[]> {
  //   return this.http.get<any[]>(this.url + 'announcements'); 
  // }
  // submitannouncement(announcementData:any):Observable<any>{
  //   return this.http.post<any>(this.url + 'postAnnouncements',announcementData)
  // }
  // getupdateannouncement(ancmnt_id: number): Observable<any> {
  //   return this.http.get<any>(`${this.url}announcements/${ancmnt_id}`); // Adjust the endpoint as necessary
  // }
  // updateannouncement(ancmnt_id: number, data: any): Observable<any> {
  //   return this.http.put<any>(`${this.url}updateAnnouncements/${ancmnt_id}`, data);
  // }
  // deleteAnnouncement(ancmnt_id: number): Observable<any> {
  //   return this.http.delete(`${this.url}destroyannouncements/${ancmnt_id}`);
  // }

  





  
}
