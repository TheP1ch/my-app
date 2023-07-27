import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Url, WorkGroups } from '../commons/constants';
import { WorkGroup } from '../commons/interfaces';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorkGroupService {
  private workGroups: any[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private httpService: HttpClient
  ) {}

  private readonly _workGroups$: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);

  get workGroups$(): Observable<any[]> {
    return this._workGroups$.asObservable();
  }

  setWorkGroups(workGroups: any[]) {
    this.workGroups = workGroups;
    this._workGroups$.next(this.workGroups);
  }

  getWorkGroups(): Observable<any[]> {
    return this.httpService.get<any[]>(`${Url}/WorkGroup`);
  }

  pushWorkGroup(workGroup: any) {
    return this.httpService.post<any>(`${Url}/WorkGroup`, workGroup);
  }
}
