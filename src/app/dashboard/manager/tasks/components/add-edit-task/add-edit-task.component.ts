import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-task',
  standalone: false,
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss'
})
export class AddEditTaskComponent {
constructor(){}

  addEditForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl('',[Validators.required] )
    });
}
