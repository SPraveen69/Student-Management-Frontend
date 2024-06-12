import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private http: HttpClient) { }

  allStudents(): Observable<any>{
    return this.http.get<any>(`${apiUrl}/Student/GetAllStudents`);
  }

  getStudent(studentId: number): Observable<any>{
    return this.http.get<any>(`${apiUrl}/Student/GetStudent/${studentId}`);
  }

  deleteStudent(studentId: number): Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Student/DeleteStudent/${studentId}`);
  }

  editStudent(studentId: number, data: any): Observable<any>{
    return this.http.put<any>(`${apiUrl}/Student/EditStudent/${studentId}`, data);
  }

  addStudent(data: any): Observable<any>{
    return this.http.post<any>(`${apiUrl}/Student/AddStudent`, data);
  }
}
