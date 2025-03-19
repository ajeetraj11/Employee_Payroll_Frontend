import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';


@Component({
  selector: 'app-employee-form',
  imports:[CommonModule,FormsModule,RouterLink],
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  employeeID:number=1;
  employee: {
    name: string;
    profilePic: string;
    gender: string;
    department: string[]; // ✅ Explicitly define type as string[]
    salary: number;
    startDate: string;
    note: string;
  } = {
    name: '',
    profilePic: '',
    gender: '',
    department: [], // ✅ Initialized as an empty string array
    salary: 0,
    startDate: '',
    note: ''
  };
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get Employee ID from URL
    this.employeeID = Number(this.route.snapshot.paramMap.get('id') || '');
    console.log(this.employeeID);
    // Fetch employee data if needed
    // this.fetchEmployeeData(this.employeeId);
  }
  departments = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];
  
  onDepartmentChange(event: Event, dept: string) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.employee.department.push(dept);
    } else {
      this.employee.department = this.employee.department.filter(d => d !== dept);
    }
  }

  profileImages = [
    'profile1.jpg',
    'profile2.png',
    'profile3.webp',
    'profile4.png'
  ];


  salaryOptions = [10000, 0,20000,30000,40000,50000];
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years = Array.from({ length: 30 }, (_, i) => 2025 - i);

  onSubmit() {
    console.log('Employee Data:', this.employee,this.employeeID);
    this.updateEmployee();
  }
 
  updateEmployee() {
    this.employeeService.updateEmployee(this.employeeID, this.employee).subscribe(
      (response) => {
        console.log("Employee updated successfully!", response);
        alert("Employee details updated!");
        this.router.navigate(['/']); // Redirect to dashboard after update
      },
      (error) => {
        console.error("Error updating employee:", error);
      }
    );
  }

  onCancel() {
    console.log('Form Cancelled');
  }

  onReset() {
    this.employee = {
      name: '',
      profilePic: '',
      gender: '',
      department: [],
      salary: 0,
      startDate: '',
      note: ''
    };
  }

}
