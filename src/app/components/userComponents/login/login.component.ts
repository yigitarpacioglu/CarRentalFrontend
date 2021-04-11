import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createSignInForm();
  }
  createSignInForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }  

  signIn() {
    if (this.signInForm.valid) {
      let loginModel = Object.assign({}, this.signInForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {

          this.router.navigate(['']);
          this.toastrService.success(response.message, 'Succesful Login');
          this.localStorageService.set('token', response.data.token);
          this.localStorageService.set('email', this.signInForm.value.email)          
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Wrong Credentials');
        }
      );
    }
  }
}
