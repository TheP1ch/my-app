import {
  Component,
  Input,
  OnChanges,
  OnInit,
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

  constructor(private dialog: MatDialog) {}

  user: User | undefined;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['task']) {
      this.user = Users.find((user) => user.id === this.task?.userId);
    }
  }

  onOpenDialog() {
    this.dialog.open(EditDialogComponent);
  }
}
