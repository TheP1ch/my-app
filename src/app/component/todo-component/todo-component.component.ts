import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Users } from '../../commons/constants';
import { Task, User } from '../../commons/interfaces';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-todo-component',
  templateUrl: './todo-component.component.html',
  styleUrls: ['./todo-component.component.css'],
})
export class TodoComponentComponent implements OnChanges {
  @Input() public task: Task;
  @Input() public previousStatus: number;
  @Output() onChangeTask: EventEmitter<[number, Task]> = new EventEmitter<
    [number, Task]
  >();
  constructor(private dialog: MatDialog) {}

  user: User | undefined;
  ngOnChanges(changes: SimpleChanges) {
    this.user = Users.find((user) => user.id === this.task?.userId);
  }

  onOpenDialog() {
    let taskCopy = { ...this.task };
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '520px',
      height: '577px',
      restoreFocus: false,
      backdropClass: 'bg',
      panelClass: 'taskDialog',
      autoFocus: 'first-header',
      data: taskCopy,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onChangeTask.emit([this.previousStatus, result]);
        this.user = Users.find((user) => user.id === result.userId);
      }
    });
  }
}
