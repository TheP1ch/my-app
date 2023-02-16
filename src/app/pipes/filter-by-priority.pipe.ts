import { Pipe, PipeTransform } from '@angular/core';
import { Priorities } from '../commons/constants';
import { Task } from '../commons/interfaces';

@Pipe({
  name: 'filterByPriority',
  pure: false,
})
export class FilterByPriorityPipe implements PipeTransform {
  transform(tasks: Task[], priorityId: number = Priorities.length): Task[] {
    if (priorityId === Priorities.length) {
      return tasks;
    }
    return tasks.filter((task) => task.priorityId === priorityId);
  }
}
