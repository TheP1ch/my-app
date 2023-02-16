import { Component, OnInit } from '@angular/core';
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

  AddWorkGroup() {
    this.workGroups.push({
      id: this.workGroups.length + 1,
      name: `Рабочая группа ${this.workGroups.length + 1}`,
    });
    console.log(this.workGroups);
  }
}
