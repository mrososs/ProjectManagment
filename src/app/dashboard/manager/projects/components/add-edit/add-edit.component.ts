import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  standalone: false,
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent {
constructor(){}

addEditForm = new FormGroup({
  title: new FormControl('', [Validators.required, Validators.email]),
  description: new FormControl('',[Validators.required] )
  });

  getControl(controlName: string): FormControl {
    return this.addEditForm.get(controlName) as FormControl;
  }

}
