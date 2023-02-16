import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../commons/interfaces';

@Pipe({
  name: 'filterByName',
  pure: false,
})
export class FilterByNamePipe implements PipeTransform {
  transform(tasks: Task[], searchByName: string = ''): Task[] {
    if (!searchByName.trim()) {
      return tasks;
    }
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(searchByName.toLowerCase())
    );
  }
}
