import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Tasks, WorkGroups } from '../commons/constants';
import { Task, WorkGroup } from '../commons/interfaces';
import { Statuses } from '../commons/constants';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private Tasks: Task[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  private readonly _tasks$: BehaviorSubject<Task[]> = new BehaviorSubject(
    this.Tasks
  );

  checkWorkGroupId(workGroupId: number): boolean {
    let workGroups: WorkGroup[] = [];
    if (!this.localStorageService.getData('Tasks')) {
      for (let workGroup of WorkGroups) {
        workGroups.push({ ...workGroup });
      }
    } else {
      const data: WorkGroup[] = JSON.parse(
        this.localStorageService.getData('workGroups') || '[]'
      );

      if (data.length !== 0) {
        workGroups = data;
      } else {
        for (let workGroup of WorkGroups) {
          workGroups.push({ ...workGroup });
        }
      }
    }
    if (workGroups.find((item) => item.id === workGroupId)) {
      return true;
    }
    return false;
  }

  getTasksMapByWorkGroupId(
    workGroupId: number
  ): Observable<Map<number, Task[]>> {
    let taskMap = this._tasks$.pipe(
      map((tasks) => {
        let result: Map<number, Task[]> = new Map<number, Task[]>();
        for (let status of Statuses) {
          result.set(status.id, []);
        }
        for (let task of tasks) {
          if (task.workGroupId !== workGroupId) continue;
          result.get(task.statusNumber)?.push(task);
        }
        return result;
      })
    );
    return taskMap;
  }

  newTasks() {
    if (!this.localStorageService.getData('Tasks') && this.Tasks.length === 0) {
      for (let task of Tasks) {
        this.Tasks.push({ ...task });
      }
    } else {
      if (this.Tasks.length !== 0) {
        this.localStorageService.saveData('Tasks', JSON.stringify(this.Tasks));
      }
      const data: Task[] = JSON.parse(
        this.localStorageService.getData('Tasks') || '[]'
      );

      if (data.length !== 0) {
        this.Tasks = data;
      }
    }

    this._tasks$.next(this.Tasks);
  }

  pushTask(task: Task) {
    this.Tasks.push(task);
  }
}
