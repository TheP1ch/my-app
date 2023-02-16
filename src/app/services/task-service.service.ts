import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Tasks } from '../commons/constants';
import { Task } from '../commons/interfaces';
import { Statuses } from '../commons/constants';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private readonly _tasks$: BehaviorSubject<Task[]> = new BehaviorSubject(
    Tasks
  );
  // public taskMap: Observable<Map<number, Task[]>> = this._tasks$.pipe(
  //   map((tasks) => {
  //     console.log(this._tasks$);
  //     let result: Map<number, Task[]> = new Map<number, Task[]>();
  //     for (let task of tasks) {
  //       if (result.has(task.statusNumber)) {
  //         result.get(task.statusNumber)?.push(task);
  //       } else {
  //         result.set(task.statusNumber, [task]);
  //       }
  //     }
  //     console.log(result);
  //     return result;
  //   })
  // );

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
}
