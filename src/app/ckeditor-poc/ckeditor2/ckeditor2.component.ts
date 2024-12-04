import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
import { FormatPainter } from 'ckeditor5-premium-features';
import { defaultHtmlToLoad } from '../default-html-to-load';

@Component({
  selector: 'app-ckeditor2',
  standalone: true,
  imports: [CKEditorModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './ckeditor2.component.html',
  styleUrl: './ckeditor2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ckeditor2Component {
  editorData = defaultHtmlToLoad;

  public Editor = ClassicEditor;
  public config = {
    licenseKey:
      'MlVnUUovS1FXVkIxNStvdW9TYUhuQ3I5VmJZYTNCUWdvU25ScWpGbFgxTkJtUExTUzN3ZGRXK2RuNjJrVlE9PS1NakF5TkRFd01UZz0=', // Or 'GPL'.
    plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
    toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter'],
  };
}
