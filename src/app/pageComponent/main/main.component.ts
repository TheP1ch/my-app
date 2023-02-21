import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WorkGroups } from 'src/app/commons/constants';
import { WorkGroup } from 'src/app/commons/interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WorkGroupService } from 'src/app/services/work-group.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public workGroups: WorkGroup[]; //! в сервис перенести

  @ViewChild('nameInput', { static: false }) nameInput: ElementRef;

  constructor(
    private router: Router,
    private workGroupService: WorkGroupService
  ) {}

  ngOnInit(): void {
    //! add to localStorage **
    this.workGroupService.newData();
    this.workGroupService._workGroups$.subscribe(
      (data) =>
        (this.workGroups = data.map((item) => {
          item.name = `Рабочая группа ${item.id}`;
          return item;
        }))
    );
  }

  AddWorkGroup() {
    const workGroup = {
      id: this.workGroups.length + 1,
      name: `Рабочая группа ${this.workGroups.length + 1}`,
    };
    this.workGroups.push(workGroup);
    this.workGroupService.pushWorkGroup(workGroup);
    //! add to localStorage **
    this.workGroupService.newData();
    this.router.navigate(['/work-group', this.workGroups.length]);
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
