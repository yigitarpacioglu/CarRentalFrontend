import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  user: User;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: Byte[];
  passwordSalt: Byte[];
  status: boolean;
  updateForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private userService:UserService,
              private activatedRoute:ActivatedRoute,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.createUserUpdateForm();    
    this.activatedRoute.params.subscribe(params=>{
      if(params['userId']){
        this.setUserInfo(params['userId']);
      }
    })  
  }

  createUserUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      email: [this.email, Validators.required],
      passwordHash: [this.passwordHash, Validators.required],
      passwordSalt: [this.passwordSalt, Validators.required],
      status: [this.status, Validators.required],
    });
  }

  setUserInfo(id: number) {
    this.userService.getById(id).subscribe((response) => {
      this.user = response.data;
      this.id = this.user.id;
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
      this.passwordHash = this.user.passwordHash;
      this.passwordSalt = this.user.passwordSalt;
      this.status = this.user.status;    
      this.createUserUpdateForm();  
    });
  }

  update() {
    if (this.updateForm.valid) {
      let userModel = Object.assign({}, this.updateForm.value);
      this.userService.update(userModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Success');
      },responseError=>{
        this.toastrService.error(responseError.error,"Wrong Credentials")
      });
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }


}
