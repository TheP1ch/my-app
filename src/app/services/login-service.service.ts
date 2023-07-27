import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { Url } from '../commons/constants';
import { lastValueFrom } from 'rxjs';

interface response {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(
    private localStorageService: LocalStorageService,
    private httpService: HttpClient,
    private router: Router
  ) {}

  getToken(login: string, password: string) {
    const body = { name: login, password };
    console.log(body);
    let result: any = this.httpService
      .post(Url + '/Auth', body)
      .subscribe((data: any) => {
        this.localStorageService.saveData('token', data['token']);
        console.log(this.localStorageService.getData('token'));
        this.router.navigate(['']);
      });
  }

  logOut() {
    this.localStorageService.removeData('token');
    this.router.navigate(['/login']);
  }
}
