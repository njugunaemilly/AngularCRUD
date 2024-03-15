import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url = 'http://localhost:3000/Employees';

  constructor(private httpClient: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.url);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.url, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<any> {
    const editUrl = `${this.url}/${id}`;
    return this.httpClient.patch(editUrl, employee);
  }

  deleteEmployee(id: number): Observable<unknown> {
    const url = `${this.url}/${id}`;
    return this.httpClient.delete(url);
  }

  getEmployeeById(id: number): Observable<Employee> {
    const url = `${this.url}/${id}`;
    return this.httpClient.get<Employee>(url);
  }

}
