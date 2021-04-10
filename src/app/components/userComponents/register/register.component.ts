import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createSignUpForm();
  }
  createSignUpForm(){
    this.signUpForm=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],      
    });
  }

  signUp(){
    if(this.signUpForm.valid){
      let registerModel = Object.assign({}, this.signUpForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success(response.message, "Succesful Register");
        this.router.navigate(['/login']);
      },responseError=>{
        this.toastrService.error(responseError.error,'Register could NOT be completed');        
      });
    }
  }
}
