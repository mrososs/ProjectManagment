import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-project',
  standalone: false,
  templateUrl: './add-edit-project.component.html',
  styleUrl: './add-edit-project.component.scss'
})
export class AddEditProjectComponent {
  constructor(){}

  addEditForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl('',[Validators.required] )
    });
}
