import { Component, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-work-group',
  templateUrl: './work-group.component.html',
  styleUrls: ['./work-group.component.css'],
})
export class WorkGroupComponent {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  clearInput() {
    this.searchInput.nativeElement.value = '';
    this.searchInput.nativeElement.focus();
  }
}
