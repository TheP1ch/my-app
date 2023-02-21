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
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { filter, lastValueFrom, map, Subscription } from 'rxjs';
import { Priorities, Statuses, Tasks } from '../../commons/constants';
import { Task } from '../../commons/interfaces';
import { TaskServiceService } from '../../services/task-service.service';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.component.html',
  styleUrls: ['./work-group.component.css'],
})
export class WorkGroupComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  private subscribeTaskService: Subscription;
  private subscribeRoute: Subscription;
  public statuses = Statuses;
  searchByName = '';
  filterByPriorityId: number;
  workGroupId: number;
  public readonly allPriorities = Priorities;
  constructor(
    private taskService: TaskServiceService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  // вернет Map в котором ключ это номер группы, а Task[] это задачи принадлежащие этой группе
  tasksData: Map<number, Task[]>;

  ngOnInit(): void {
    this.subscribeRoute = this.route.params.subscribe((params) => {
      //? add to localStorage **
      this.taskService.newTasks();
      console.log(this.taskService.checkWorkGroupId(+params['id']));
      this.workGroupId = +params['id'];
      this.subscribeTaskService = this.taskService
        .getTasksMapByWorkGroupId(this.workGroupId)
        .subscribe((data) => (this.tasksData = data));
    });
  }

  ngOnDestroy(): void {
    this.subscribeRoute.unsubscribe();
    this.subscribeTaskService.unsubscribe();
  }

  public getConnectedStatuses(statusId: number): string[] {
    return this.statuses
      .filter((status) => status.id !== statusId)
      .map((status) => `status-${status.id}`);
  }

  getTasksCertainGroup(
    allTasks: Map<number, Task[]> | null,
    statusNumber: number
  ): Task[] {
    return (allTasks?.get(statusNumber) ?? []).sort(
      (a, b) => a.statusPosition - b.statusPosition
    );
  }

  clearInput() {
    this.searchByName = '';
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
    //? add to localStorage **
    this.taskService.newTasks();
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
    //? add to localStorage **
    this.taskService.newTasks();
  }

  onOpenAddDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '520px',
      height: '577px',
      restoreFocus: false,
      backdropClass: 'bg',
      panelClass: 'taskDialog',
      autoFocus: 'first-header',
      data: { workGroupId: this.workGroupId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.tasksData.get(result.statusNumber)?.unshift(result);
        this.tasksData.get(result.statusNumber)?.forEach((item, index) => {
          item.statusPosition = index;
        });
        this.taskService.pushTask(result);
        //? add to localStorage **
        this.taskService.newTasks();
      }
    });
  }

  onOpenAddDialogByStatus(statusNumber: number) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '520px',
      height: '577px',
      restoreFocus: false,
      backdropClass: 'bg',
      panelClass: 'taskDialog',
      autoFocus: 'first-header',
      data: { workGroupId: this.workGroupId, statusNumber: statusNumber },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.tasksData.get(result.statusNumber)?.unshift(result);
        this.tasksData.get(result.statusNumber)?.forEach((item, index) => {
          item.statusPosition = index;
        });
        this.taskService.pushTask(result);
        //? add to localStorage **
        this.taskService.newTasks();
      }
    });
  }
}
