import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkGroups } from '../commons/constants';
import { WorkGroup } from '../commons/interfaces';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class WorkGroupService {
  private workGroups: WorkGroup[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  private readonly _workGroups$: BehaviorSubject<WorkGroup[]> =
    new BehaviorSubject(this.workGroups);

  get workGroups$(): Observable<WorkGroup[]> {
    return this._workGroups$.asObservable();
  }

  newData() {
    if (
      !this.localStorageService.getData('workGroups') &&
      this.workGroups.length === 0
    ) {
      for (let workGroup of WorkGroups.map((item) => {
        item.name = `Рабочая группа ${item.id}`;
        return item;
      })) {
        this.workGroups.push({ ...workGroup });
      }
    } else {
      if (this.workGroups.length !== 0) {
        this.localStorageService.saveData(
          'workGroups',
          JSON.stringify(this.workGroups)
        );
      }

      const data: WorkGroup[] = JSON.parse(
        this.localStorageService.getData('workGroups') || '[]'
      );

      if (data.length !== 0) {
        this.workGroups = data;
      }
    }
    this._workGroups$.next(this.workGroups);
  }

  pushWorkGroup(workGroup: WorkGroup) {
    this.workGroups.push(workGroup);
  }
}
