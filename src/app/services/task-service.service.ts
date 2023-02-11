import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { beginTasks } from '../commons/constants';
import { Task } from '../commons/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private readonly tasks$: BehaviorSubject<Task[]> = new BehaviorSubject(
    beginTasks
  );

  get tasks() {
    return this.tasks$;
  }
}
