import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private http : HttpClient) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }



  onSubmit() {
      this.submitted = true;
       
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.http.post(`http://localhost:8000/login`,{
          username : this.loginForm.value.username,
          password : this.loginForm.value.password
      })
      .subscribe(
        res => {
            console.log(`login response:`, res) 
            if (res.success === true){
                this.router.navigate(['/dashboard'])
                console.log('a7a')
            }  else{
                alert('Wrong Credentials : Please try again')
            }
          
        },
        err => {
          console.log('Error occured');
        }

      )
  }
}

