import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkGroups } from '../commons/constants';
import { WorkGroup } from '../commons/interfaces';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class WorkGroupService {
  private workGroups: WorkGroup[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  public readonly _workGroups$: BehaviorSubject<WorkGroup[]> =
    new BehaviorSubject(this.workGroups);

  newData() {
    if (
      !this.localStorageService.getData('workGroups') &&
      this.workGroups.length === 0
    ) {
      for (let workGroup of WorkGroups) {
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
        console.log(data, 'data');
        this.workGroups = data;
      }
    }
    this._workGroups$.next(this.workGroups);
  }

  pushWorkGroup(workGroup: WorkGroup) {
    this.workGroups.push(workGroup);
  }
}
