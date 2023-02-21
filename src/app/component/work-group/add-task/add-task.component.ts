import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Priorities, Statuses, Tasks, Users } from 'src/app/commons/constants';
import { Task, User } from 'src/app/commons/interfaces';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  private _task: Task = {
    workGroupId: this.data.workGroupId,
    id: Tasks.length,
    name: '',
    price: 0,
    lastUpdateDate: new Date(Date.now()),
    createDate: new Date(Date.now()),
    priorityId: 0,
    statusNumber: 0,
    statusPosition: 0,
  };

  public taskName = this._task.name;
  public taskPrice: number;

  public readonly allStatuses = Statuses;

  public statuses = this.allStatuses.filter((status) => {
    if (status.id === this._task.statusNumber) return false;
    return true;
  });

  public statusNumber: number;

  public readonly allPriorities = Priorities;

  public prioritiesFilter = this.allPriorities.filter((priority) => {
    if (priority.id === this._task.priorityId) return false;
    return true;
  });

  public readonly allUsers = Users;

  public usersFilter = this.allUsers.filter((user) => {
    if (user.id === this._task.userId) return false;
    return true;
  });

  public userFind: User | undefined = this.allUsers.find((item) => {
    if (item.id === this._task.userId) return true;
    return false;
  });

  get task() {
    return this._task;
  }

  setStatus(statusNumber: number): void {
    this._task.statusNumber = statusNumber;
    this.statuses = this.allStatuses.filter((status) => {
      if (status.id === this._task.statusNumber) return false;
      return true;
    });
  }

  setPriority(priorityId: number): void {
    this._task.priorityId = priorityId;
    this.prioritiesFilter = this.allPriorities.filter((priority) => {
      if (priority.id === this._task.priorityId) return false;
      return true;
    });
  }

  setUser(userId: number): void {
    this.userFind = this.allUsers[userId];
    this._task.userId = userId;
    this.usersFilter = this.allUsers.filter((user) => {
      if (user.id === this._task.userId) return false;
      return true;
    });
  }

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { workGroupId: number; statusNumber?: number }
  ) {
    if (data.statusNumber !== undefined) {
      this.statusNumber = data.statusNumber;
      this.task.statusNumber = data.statusNumber;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveData() {
    this._task.name = this.taskName;
    if (+this.taskPrice) {
      this._task.price = +this.taskPrice;
      this.dialogRef.close(this._task);
    }
  }
}
