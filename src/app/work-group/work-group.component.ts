import { Component, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { Statuses } from '../commons/constants';
import { Task } from '../commons/interfaces';

@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.component.html',
  styleUrls: ['./work-group.component.css'],
})
export class WorkGroupComponent {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  task: Task = {
    id: 0,
    name: 'Обновление ПО',
    price: 2500,
    lastUpdateDate: new Date(Date.now() - 691200000),
    createDate: new Date(),
    userId: 0,
    priorityId: 0,
    statusId: 0,
    statusPosition: 0,
  };
  public readonly statuses = Statuses;

  clearInput() {
    this.searchInput.nativeElement.value = '';
    this.searchInput.nativeElement.focus();
  }
}
