import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent {
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close('');
  }
}
