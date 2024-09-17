import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CKEditorPOCComponent } from './ckeditor-poc/ckeditor-poc.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CKEditorPOCComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'letters-poc';
}
