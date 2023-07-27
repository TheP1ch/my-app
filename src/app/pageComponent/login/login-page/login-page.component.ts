import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  userNameControl = new FormControl<string>('');
  userPasswordControl = new FormControl('');

  constructor(
    private loginService: LoginServiceService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.localStorage.getData('token')) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    if (this.userNameControl.value && this.userPasswordControl.value) {
      this.loginService.getToken(
        this.userNameControl.value,
        this.userPasswordControl.value
      );
    }
  }
}
