import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WorkGroups } from 'src/app/commons/constants';
import { WorkGroup } from 'src/app/commons/interfaces';
import { WorkGroupService } from 'src/app/services/work-group.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public workGroups: WorkGroup[];

  @ViewChild('nameInput', { static: false }) nameInput: ElementRef;

  constructor(
    private router: Router,
    private workGroupService: WorkGroupService
  ) {}

  ngOnInit(): void {
    this.workGroupService
      .getWorkGroups()
      .subscribe((data: any[]) => this.workGroupService.setWorkGroups(data));
    this.workGroupService.workGroups$.subscribe((data) => {
      this.workGroups = data;
    });
  }

  AddWorkGroup() {
    const workGroup = {
      name: `Рабочая группа ${
        this.workGroups[this.workGroups.length - 1].id + 1
      }`,
    };
    this.workGroupService.pushWorkGroup(workGroup).subscribe((data) => {
      this.workGroups.push(data);
      this.router.navigate(['/work-group', data.id]);
    });
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

  exitInputbyEnter(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.disableInput(event.target);
    }
  }
}
