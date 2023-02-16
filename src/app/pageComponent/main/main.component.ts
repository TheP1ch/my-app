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
    console.log(target.readOnly, 'dbl');
    target.readOnly = !target.readOnly;
    target.focus();
    console.log(target.readOnly, 'exit dbl');
  }

  disableInput(target: any) {
    console.log(target.readOnly, 'disable');
    if (!target.readOnly) {
      target.readOnly = !target.readOnly;
    }
    console.log(target.readOnly, 'exit disable');
  }
}
