import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private loginService: LoginServiceService) {}

  logOut() {
    this.loginService.logOut();
  }
}
