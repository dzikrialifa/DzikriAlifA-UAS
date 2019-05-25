import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Friend } from '../friend/friend';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  imageMe = '../assets/foto.JPG';
  title = 'MyFriends~APP';

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  login() {
    if (this.form.valid) {
      // tslint:disable-next-line: no-unused-expression
      // tslint:disable-next-line: label-position
      // tslint:disable-next-line: no-unused-expression
      location.href.link('friend');
    }
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  ngOnInit() {
  }

}
