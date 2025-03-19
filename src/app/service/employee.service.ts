import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Automatically registers the service globally
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/employeepayrollservice/get'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/employeepayrollservice/delete/${id}`);
  }
   // Update employee data (PUT request)
   updateEmployee(id: number, employeeData: any): Observable<any> {
    return this.http.put(`http://localhost:8080/employeepayrollservice/update/${id}`, employeeData);
  }
  addEmployee(employee: any): Observable<any> {
    return this.http.post(`http://localhost:8080/employeepayrollservice/create`, employee);
  }
}
