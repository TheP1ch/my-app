import {
  Component,
  ViewChild,
  ElementRef,
  ContentChild,
  OnChanges,
  SimpleChanges,
  DoCheck,
  OnInit,
} from '@angular/core';
import { map } from 'rxjs';
import { Statuses } from '../commons/constants';
import { Task } from '../commons/interfaces';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.component.html',
  styleUrls: ['./work-group.component.css'],
})
export class WorkGroupComponent implements DoCheck {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  public readonly statuses = Statuses;
  constructor(private taskService: TaskServiceService) {}
  // вернет Map в котором ключ это номер группы, а Task[] это задачи принадлежащие этой группе
  tasksData = this.taskService.tasks;

  getTasksCertainGroup(
    allTasks: Map<number, Task[]> | null,
    statusNumber: number
  ): Task[] {
    console.log('init');
    // console.log(allTasks?.get(statusNumber));
    return allTasks?.get(statusNumber) ?? [];
  }
  clearInput() {
    this.searchInput.nativeElement.value = '';
    this.searchInput.nativeElement.focus();
  }
  sumCalculation(tasks: Task[]): number {
    return tasks.reduce((acc, task) => (acc += task.price), 0);
  }

  ngDoCheck(): void {
    console.log('hi');
  }
}
