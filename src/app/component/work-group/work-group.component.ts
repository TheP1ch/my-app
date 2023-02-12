import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  Component,
  ViewChild,
  ElementRef,
  ContentChild,
  OnChanges,
  SimpleChanges,
  DoCheck,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { lastValueFrom, map, Subscription } from 'rxjs';
import { Statuses } from '../../commons/constants';
import { Task } from '../../commons/interfaces';
import { TaskServiceService } from '../../services/task-service.service';

@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.component.html',
  styleUrls: ['./work-group.component.css'],
})
export class WorkGroupComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  private subscribeTaskService: Subscription;
  public readonly statuses = Statuses;
  constructor(private taskService: TaskServiceService) {}
  // вернет Map в котором ключ это номер группы, а Task[] это задачи принадлежащие этой группе
  tasksData: Map<number, Task[]>;

  getTasksCertainGroup(
    allTasks: Map<number, Task[]> | null,
    statusNumber: number
  ): Task[] {
    return (allTasks?.get(statusNumber) ?? []).sort(
      (a, b) => a.statusPosition - b.statusPosition
    );
  }

  clearInput() {
    this.searchInput.nativeElement.value = '';
    this.searchInput.nativeElement.focus();
  }

  sumCalculation(tasks: Task[]): number {
    return tasks.reduce((acc, task) => (acc += task.price), 0);
  }

  drop(event: CdkDragDrop<Task[]>, tasks: Task[]) {
    const currentStatusNumber = +event.container.id.slice(-1);
    const taskId = event.previousContainer.data[event.previousIndex].id;
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let task = this.tasksData
        ?.get(currentStatusNumber)
        ?.find((item) => item.id === taskId);
      if (task) {
        task.statusNumber = currentStatusNumber;
      }
    } else {
      moveItemInArray(tasks, event.previousIndex, event.currentIndex);
    }
    this.tasksData?.get(currentStatusNumber)?.forEach((item, index) => {
      item.statusPosition = index;
    });
  }

  ngOnInit(): void {
    this.subscribeTaskService = this.taskService.taskMap.subscribe(
      (data) => (this.tasksData = data)
    );
  }

  ngOnDestroy(): void {
    this.subscribeTaskService.unsubscribe();
  }
}
