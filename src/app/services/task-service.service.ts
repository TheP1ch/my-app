import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Tasks } from '../commons/constants';
import { Task } from '../commons/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private readonly tasks$: BehaviorSubject<Task[]> = new BehaviorSubject(Tasks);

  get tasks() {
    return this.tasks$.pipe(
      map((tasks) => {
        let result: Map<number, Task[]> = new Map<number, Task[]>();
        for (let task of tasks) {
          if (result.has(task.statusNumber)) {
            result.get(task.statusNumber)?.push(task);
          } else {
            result.set(task.statusNumber, [task]);
          }
        }
        console.log(result);
        return result;
      })
    );
  }
}
