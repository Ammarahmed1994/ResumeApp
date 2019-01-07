import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  remove: any;
  columnDefs = [
    { headerName: 'First Name', field: 'firstName', checkboxSelection: true },
    { headerName: 'Last Name', field: 'lastName' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Position', field: 'role' },
    { headerName: 'Resume Link', field: 'resumeFile' }
  ];

  rowData: any;

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit() {
    this.rowData = this.http.get('http://localhost:8000/dbconnection/students');

    }

  logout(){
    this.router.navigate(['/home'])
  }  
  }
