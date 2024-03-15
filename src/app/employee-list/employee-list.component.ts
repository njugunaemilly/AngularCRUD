import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees!: Employee[];
  employee!: Employee;
  page: number = 1;
  itemsPerPage: number = 6;
  totalItems = 4;
  closeResult!: string;
  employeeForm!: FormGroup;
  employeeToUpdate: Employee | null = null;
  employeeView!: Employee;
  deleteId!: number;
  specificEmployee!: any;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
) {
  this.employeeForm = this.fb.group({
    id: [''],
    firstName: ['', Validators.required], 
    lastName: ['', Validators.required],
    email: ['', Validators.email] 
  });
}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService
      .getAllEmployees()
      .subscribe((employees: Employee[]) => {
        this.employees = employees;
      });
  }

  open(content: any, employee?: Employee) {
    this.employeeToUpdate = employee || null; // If adding new employee set to nuull
    this.employeeForm.reset(); //reset form

    //implement this if employee information is being updated
    if (employee) {
      this.employeeForm.patchValue({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
      });
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        backdrop: 'static',
        size: 'lg',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  saveEmployee() {
    const employeeData = this.employeeForm.value;
  
    const saveOperation = this.employeeToUpdate ?
      this.employeeService.updateEmployee(this.employeeToUpdate.id, employeeData) :
      this.employeeService.addEmployee(employeeData);
  
    saveOperation.subscribe(() => {
      const action = this.employeeToUpdate ? 'updated' : 'added';
      console.log(`Employee ${action} successfully`);
      this.handleEmployeeAction(action);
    });
  }
  
  handleEmployeeAction(action: string) {
    this.getEmployees();
    this.modalService.dismissAll();
    this.toastr.success(`Employee ${action} successful`);
  }
  
  gotToEmployeeList() {
    this.router.navigate(['/view-employees']);
  }
  openDetails(contentView: any, employee: Employee) {
    this.employeeService.getEmployeeById(employee.id).subscribe({
      next: (res: Employee) => {
        // this.specificEmployee = res;
        this.employeeView = res;
        this.modalService.open(contentView, {
          centered: true,
          backdrop: 'static',
          size: 'sm',
        });
      },
    });
  }

  openDelete(targetModal: any, employee: Employee) {
    this.deleteId = employee.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
    });
  }

  onDelete() {
    this.employeeService.deleteEmployee(this.deleteId).subscribe(() => {
      this.getEmployees();
      this.modalService.dismissAll();
      this.toastr.success('Employee successfully deleted')
    });
  }
}
