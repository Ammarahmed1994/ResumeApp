import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  url: 'http://localhost:4200/submit';
  positions: any;
  name: any;
  email: any;
  resumeFile: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      resumeFile: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });

    this.http.get('http://localhost:8000/dbconnection/positions').subscribe(data => {
      console.log(data);
      this.positions = data;
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.http.post('http://localhost:8000/submit', {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      positions: this.registerForm.value.role,
      resumeFile: this.registerForm.value.resumeFile
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }

      )
  };
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));


}
