import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Login } from './login';

import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  login = [];
  model = new Login();
  form: FormGroup;
  submitted = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() 
  
  {
    this.getAllLogin();
  }
  
  public getAllLogin() {
    this.loginService
      .getAllLoginService()
      .subscribe((x: any[]) => {
        this.login = x;
      });
  }
  editLogin(id: string) {

    alert(id);

    this.loginService

      .getLoginService(id)

      .subscribe((data: any) => (this.model = data));

  }
 
 
  deleteLogin(id) {
    alert(id);
    this.loginService
      .deleteLoginService(id)
      .subscribe((data) => {
        this.getAllLogin();
      });
  }

  addLogin() {
     alert(JSON.stringify(this.model));
    if (!this.model.id) {
      // alert(JSON.stringify(this.model));
      this.loginService
        .createLoginService(this.model)
        .subscribe((data) => {
          this.getAllLogin();
          this.model = new Login();
        });
    } else {
      // alert(JSON.stringify(this.model));
      this.loginService
        .updateLoginService(this.model.id, this.model)
        .subscribe((data) => {
          this.getAllLogin();
          this.model = new Login();
        });
    }
    
  }
 
}
