import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'dialog-elements.component',
  templateUrl: 'dialog-elements.component.html',
})
export class DialogElementsComponent {
 
 
  

  constructor(private dialogRef: MatDialogRef<DialogElementsComponent >) { }
  // result: Boolean = false;

  onClose(result: Boolean) {
    // this.result = result;
    this.dialogRef.close(result);

  }

  @Input() title: String = 'Atenção';
  @Input() message: String = 'Deseja realmente excluir sua conta?';
  edtiarDialog(title: string, message:string): void {
  this.title = title;
  this.message = message;
  }

}
