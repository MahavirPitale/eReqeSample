import {FormControl, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
// import { fadeInAnimation } from '../../../route.animation';
import { Http, Headers,Request, Response, HttpModule,RequestOptions } from '@angular/http';

import { LoginService } from '../../services/login.service'


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//const password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {

  

  ngOnInit() {
  }
  email: string;
  password: string;
  res:any;
  ErrorMsg:string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);
    
    passwordFormControl=new FormControl('', [
      Validators.required]
      // Validators.pattern(password)]
    );

      
       
    
        constructor( 
          private _login: LoginService, 
          // private route: ActivatedRoute,
          private router: Router){
    }
      onLogin() {
    
        const loginRequest = {
          email: this.email,
          password: this.password
        };
    
        
     let headers = new Headers()  
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });  
    
    
         let body = JSON.stringify(
            {
             'email':this.email,
            'password':this.password,
            // 'Password':this.loginpassword
            })
       this._login.validateUser(body,options)
               .subscribe(
                 data => {
                    this.res = data;
                    
                    console.log(this.res.role.name);
                    if(this.res.role.name == 'admin')
                    {
                        
                      sessionStorage.setItem("Token", JSON.stringify(this.res.token));
                      sessionStorage.setItem("id", JSON.stringify(this.res.id));
                      sessionStorage.setItem("email", JSON.stringify(this.res.email));
                      sessionStorage.setItem("name", JSON.stringify(this.res.name));
                      
                      
                       this.router.navigate(['/home']);
                        
                    }
                    else
                    {
                      this.ErrorMsg="Invalid email id or Password";
                       //this.router.navigate(['/login']);
                    }
                    
                  },
               error => {
                 console.log(error),
                 () => console.log("validateUser() complete from loginUser " + this.res.Status)
                
              });    
      }

}
