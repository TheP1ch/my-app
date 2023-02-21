import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  DoCheck,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Priorities, Statuses, Users } from 'src/app/commons/constants';
import { Task, User } from 'src/app/commons/interfaces';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent {
  @ViewChild('commentArea', { static: false }) commentArea: ElementRef;
  public readonly allStatuses = Statuses;

  public statuses = this.allStatuses.filter((status) => {
    if (status.id === this.data.statusNumber) return false;
    return true;
  });

  public readonly allPriorities = Priorities;

  public prioritiesFilter = this.allPriorities.filter((priority) => {
    if (priority.id === this.data.priorityId) return false;
    return true;
  });

  public readonly allUsers = Users;

  public usersFilter = this.allUsers.filter((user) => {
    if (user.id === this.data.userId) return false;
    return true;
  });

  public userFind: User | undefined = this.allUsers.find((item) => {
    if (item.id === this.data.userId) return true;
    return false;
  });

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  saveData() {
    this.data.comment = this.commentArea.nativeElement.value;
    this.dialogRef.close(this.data);
  }

  changeStatus(statusNumber: number): void {
    this.data.statusNumber = statusNumber;
    this.statuses = this.allStatuses.filter((status) => {
      if (status.id === this.data.statusNumber) return false;
      return true;
    });
  }

  changePriority(priorityId: number): void {
    this.data.priorityId = priorityId;
    this.prioritiesFilter = this.allPriorities.filter((priority) => {
      if (priority.id === this.data.priorityId) return false;
      return true;
    });
  }

  changeUser(userId: number): void {
    this.userFind = this.allUsers[userId];
    this.data.userId = userId;
    this.usersFilter = this.allUsers.filter((user) => {
      if (user.id === this.data.userId) return false;
      return true;
    });
  }
}
