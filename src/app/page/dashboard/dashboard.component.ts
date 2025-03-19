import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../service/employee.service';
import { routes } from '../../app.routes';
import { RouterLink } from '@angular/router';
import { EditPageComponent } from '../edit-page/edit-page.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  employees: any[] = [];

  // constructor(private employeeService: EmployeeService,private edit:EditPageComponent) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }
  constructor(private employeeService: EmployeeService, private router: Router) {}

  send(id: number) {
    console.log(id);
    this.router.navigate(['/editpage', id]);  // Navigate to the edit page
  }
   
  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        console.log('Employee data fetched:', this.employees);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  editemployee(){
    routes
  }

  deleteEmployee(id: number) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          console.log(id);
          alert("Employee deleted successfully!");
          this.fetchEmployees(); // Refresh the list
        },
        error: (err) => {
          console.log(id);
          console.error("Error deleting employee:", err);
          alert("Failed to delete employee.");
        }
      });
    }
  }
  
}
