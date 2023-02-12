import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Users } from '../../commons/constants';
import { Task, User } from '../../commons/interfaces';

@Component({
  selector: 'app-todo-component',
  templateUrl: './todo-component.component.html',
  styleUrls: ['./todo-component.component.css'],
})
export class TodoComponentComponent implements OnChanges {
  @Input() public task: Task;

  user: User | undefined;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['task']) {
      this.user = Users.find((user) => user.id === this.task?.userId);
    }
  }
}
