import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';


import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,

} from '@angular/cdk/drag-drop';

const MaterialComponents = [
  CommonModule,
  MatIconModule,
  MatMenuModule,
  MatDividerModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule ,

  MatTooltipModule,
  MatCardModule,

  DragDropModule ,
  //  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,

];

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    MaterialComponents,
    //  MaterialFileInputModule
  ],
  exports: [MaterialComponents],
})
export class MaterialModule {}
