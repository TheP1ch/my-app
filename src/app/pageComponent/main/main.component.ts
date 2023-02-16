import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WorkGroups } from 'src/app/commons/constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  public workGroups = WorkGroups.map((item) => {
    item.name = `Рабочая группа ${item.id}`;
    return item;
  });

  @ViewChild('nameInput', { static: false }) nameInput: ElementRef;

  AddWorkGroup() {
    this.workGroups.push({
      id: this.workGroups.length + 1,
      name: `Рабочая группа ${this.workGroups.length + 1}`,
    });
    console.log(this.workGroups);
  }

  enableInput(target: any) {
    if (target.readOnly) {
      target.readOnly = !target.readOnly;
      target.focus();
      target.select();
    }
  }

  disableInput(target: any) {
    if (!target.readOnly) {
      target.readOnly = !target.readOnly;
    }
  }
}
