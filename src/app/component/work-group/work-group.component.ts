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
  public statuses = Statuses;
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
    console.log(this.tasksData);
  }

  ngOnInit(): void {
    this.subscribeTaskService = this.taskService.taskMap.subscribe(
      (data) => (this.tasksData = data)
    );
    console.log('ho');
  }

  ngOnDestroy(): void {
    this.subscribeTaskService.unsubscribe();
  }

  updateTasks(taskTurple: [number, Task]) {
    let arr = this.tasksData.get(taskTurple[0]);
    if (arr) {
      arr[taskTurple[1].statusPosition].lastUpdateDate = new Date(Date.now());
      arr[taskTurple[1].statusPosition].userId = taskTurple[1].userId;
      arr[taskTurple[1].statusPosition].priorityId = taskTurple[1].priorityId;
      arr[taskTurple[1].statusPosition].comment = taskTurple[1].comment;

      if (taskTurple[0] !== taskTurple[1].statusNumber) {
        let task = arr.splice(taskTurple[1].statusPosition, 1).pop();
        if (task) {
          task.statusNumber = taskTurple[1].statusNumber;
          let newContainerLength = this.tasksData.get(
            taskTurple[1].statusNumber
          )?.length;
          if (newContainerLength) {
            task.statusPosition = newContainerLength - 1;
          }
          this.tasksData.get(taskTurple[1].statusNumber)?.push(task);
          this.tasksData?.get(taskTurple[0])?.forEach((item, index) => {
            item.statusPosition = index;
          });
          this.tasksData?.get(task?.statusNumber)?.forEach((item, index) => {
            item.statusPosition = index;
          });
        }
      }
    }
  }
}
