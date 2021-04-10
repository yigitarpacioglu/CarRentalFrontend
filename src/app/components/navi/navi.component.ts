import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  user:User;
  email=this.localStorageService.get('email');

  constructor(private authService: AuthService,
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    if(this.isSignedIn())
        this.getByEmail();  
      }
  
  isSignedIn():boolean{
    return this.authService.isAuthenticated();
  }

  getByEmail(){    
    this.userService.getUserByEmail(this.email).subscribe(response=>{
      this.user=response.data 
      this.localStorageService.set('user',this.user) 
    });
  }
  logout(){
    this.authService.logout();
    this.toastrService.success('You are succesfully logged out from account, take care!!','Logged Out')
  }

}
