import { Component, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { map } from 'rxjs';
import { Statuses } from '../commons/constants';
import { Task } from '../commons/interfaces';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.component.html',
  styleUrls: ['./work-group.component.css'],
})
export class WorkGroupComponent {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  // task: Task = {
  //   id: 0,
  //   name: 'Обновление ПО',
  //   price: 2500,
  //   lastUpdateDate: new Date(Date.now() - 691200000),
  //   createDate: new Date(),
  //   userId: 0,
  //   priorityId: 0,
  //   statusNumber: 0,
  //   statusPosition: 0,
  // };
  public readonly statuses = Statuses;
  constructor(private taskService: TaskServiceService) {}
  // вернет Map в котором ключ это номер группы, а Task[] это задачи принадлежащие этой группе
  tasksData = this.taskService.tasks;
  getTasksCertainGroup(
    allTasks: Map<number, Task[]> | null,
    statusNumber: number
  ): Task[] {
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
}
