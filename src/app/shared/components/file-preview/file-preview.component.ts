import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrl: './file-preview.component.scss' ,
  standalone:false ,
})
export class FilePreviewComponent {
  @Input() passedFile: File | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  openPreview(event: MouseEvent) {
    // Prevent the event from propagating and triggering other click listeners
    event.stopPropagation();

    if (this.passedFile) {
      const url = URL.createObjectURL(this.passedFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.passedFile.name;
      link.click();

      // Revoke the URL after download to avoid memory leaks
      URL.revokeObjectURL(url);
    }
  }
}
