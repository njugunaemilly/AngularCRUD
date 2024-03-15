import { Component } from '@angular/core';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  employee!: Employee 

  constructor(private employeeService: EmployeeService, private route: Router){}

  saveEmployee(){
    this.employeeService.addEmployee(this.employee).subscribe(data=>{
      console.log(data);
      this.gotToEmployeeList()
    })
  }

  gotToEmployeeList(){
    this.route.navigate(['/view-employees']);
  }

  onSubmit(){
    console.log(this.employee);
    this.saveEmployee();
  }
}
