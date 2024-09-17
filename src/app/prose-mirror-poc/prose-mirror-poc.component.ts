import { ChangeDetectionStrategy, Component, ElementRef, Inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { Schema, DOMParser } from "prosemirror-model"
import { schema } from "prosemirror-schema-basic"
import { addListNodes } from "prosemirror-schema-list"
import { exampleSetup } from "prosemirror-example-setup"
import { CommonModule, DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-prose-mirror-poc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prose-mirror-poc.component.html',
  styleUrl: './prose-mirror-poc.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProseMirrorPOCComponent {
  @ViewChild('editor', { static: true }) editor!: ElementRef<HTMLElement>
  @ViewChild('content', { static: true }) content!: ElementRef<HTMLElement>
  constructor(@Inject(DOCUMENT) private document: Document) {}
  ngAfterViewInit() {
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks
    });

    (window as any).view = new EditorView(this.editor.nativeElement, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(this.content.nativeElement),
        plugins: exampleSetup({ schema: mySchema })
      })
    })
  }
}
