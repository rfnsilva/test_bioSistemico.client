import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  title = 'login';
  readonly apiURL : string;
  public route: Router;
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private http: HttpClient, private rota: Router){
    this.apiURL = 'http://localhost:3333';
    this.route = rota;
  }

  ngOnInit(): void {
  }

  login(user: User) {
    console.log(user)
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');


    this.http.post(`${this.apiURL}/login`, user, { 'headers': headers })
      .subscribe(result => {
        console.log(result)
        window.localStorage.setItem('currentToken', JSON.stringify(result));
        this.route.navigate(['/home']);
      });
  }

  onSubmit() {
    this.login(this.profileForm.value);
  }
}
