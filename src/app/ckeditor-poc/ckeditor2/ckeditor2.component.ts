/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
  Component,
  ViewChild,
  HostListener,
  ViewEncapsulation,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {
  EditorConfig,
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  CKBox,
  CKBoxImageEdit,
  CloudServices,
  Essentials,
  FontSize,
  FontFamily,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  RemoveFormat,
  Strikethrough,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  Underline,
  Undo,
} from 'ckeditor5';

import {
  // Collaboration features
  Comments,
  CommentsRepository,

  // Premium features
  CaseChange,
  ExportPdf,
  ExportWord,
  ImportWord,
  MultiLevelList,
  PasteFromOfficeEnhanced,
  SlashCommand,
} from 'ckeditor5-premium-features';

import { UsersInit } from '../users/users-init-plugin';

import { LICENSE_KEY, configUpdateAlert } from '../credentials';
import { CommentsIntegration } from '../integrations/load-save/comments-load-save-plugin';
import { defaultHtmlToLoad } from '../default-html-to-load';

export interface PolicyChunk {
  key: string;
  userId: string;
  text: string;
}
@Component({
  selector: 'app-ckeditor2',
  standalone: true,
  imports: [CommonModule, CKEditorModule],
  templateUrl: './ckeditor2.component.html',
  styleUrls: ['./ckeditor2.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Ckeditor2Component {
  @Output() chunksCreated = new EventEmitter<PolicyChunk[]>();
  @ViewChild('editorAnnotationsElement')
  private editorAnnotations!: ElementRef<HTMLDivElement>;
  @ViewChild('editorContainerElement')
  private editorContainer!: ElementRef<HTMLDivElement>;

  constructor(renderer: Renderer2, changeDetector: ChangeDetectorRef) {
    this.renderer = renderer;
    this.changeDetector = changeDetector;
  }

  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
  public editorInstance: ClassicEditor | null = null;
  public editorData = defaultHtmlToLoad;

  private renderer: Renderer2;
  private changeDetector: ChangeDetectorRef;

  public onReady(editor: ClassicEditor): void {
    this.editorInstance = editor;
  }

  public ngAfterViewInit(): void {
    this.config = {
      plugins: [
        Alignment,
        Autoformat,
        AutoLink,
        Autosave,
        BlockQuote,
        Bold,
        CKBox,
        CKBoxImageEdit,
        CloudServices,
        Essentials,
        FontSize,
        FontFamily,
        GeneralHtmlSupport,
        Heading,
        Highlight,
        Image,
        ImageCaption,
        ImageResize,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Italic,
        Link,
        List,
        MediaEmbed,
        Mention,
        Paragraph,
        PasteFromOffice,
        PictureEditing,
        RemoveFormat,
        Strikethrough,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        Underline,
        Undo,

        Comments,

        CaseChange,
        ExportPdf,
        ExportWord,
        ImportWord,
        MultiLevelList,
        PasteFromOfficeEnhanced,
        SlashCommand,

        UsersInit,
        CommentsIntegration,
      ],
      // TODO(wj): clean up tool bar cuz wont' need most things for this ckeditor.. just import from word and ??
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'comment',
          '|',
          'importWord',
          'exportWord',
          'exportPdf',
          'caseChange',
          '|',
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'removeFormat',
          '|',
          'link',
          'insertImage',
          'mediaEmbed',
          'insertTable',
          'highlight',
          'blockQuote',
          '|',
          'alignment',
          '|',
          'bulletedList',
          'numberedList',
          'multiLevelList',
          '|',
          'accessibilityHelp',
        ],
      },
      comments: {
        editorConfig: {
          extraPlugins: [Bold, Italic, Underline, List, Autoformat],
        },
      },
      exportPdf: {
        stylesheets: [
          'https://cdn.ckeditor.com/ckeditor5/42.0.0/ckeditor5.css',
          'https://cdn.ckeditor.com/ckeditor5-premium-features/42.0.0/ckeditor5-premium-features.css',
        ],
        fileName: 'export-pdf-demo.pdf',
        appID: 'cke5-demos',
        converterOptions: {
          format: 'Tabloid',
          margin_top: '20mm',
          margin_bottom: '20mm',
          margin_right: '24mm',
          margin_left: '24mm',
          page_orientation: 'portrait',
        },
        tokenUrl: false,
      },
      // NOTE**: the default is to send to the cloud service convertor of CKEditor, but you can provide your own URL for an onsite convertor
      // NOTE 2: this looks like crap with our docx files.. :(
      importWord: {
        formatting: {
          resets: 'inline',
          defaults: 'inline',
          styles: 'inline',
        },
      },
      exportWord: {
        stylesheets: [
          'https://cdn.ckeditor.com/ckeditor5/42.0.0/ckeditor5.css',
          'https://cdn.ckeditor.com/ckeditor5-premium-features/42.0.0/ckeditor5-premium-features.css',
        ],
        fileName: 'export-word-demo.docx',
        converterOptions: {
          format: 'Tabloid',
          margin_top: '20mm',
          margin_bottom: '20mm',
          margin_right: '24mm',
          margin_left: '24mm',
          orientation: 'portrait',
        },
        tokenUrl: false,
      },
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true,
          },
        ],
      },
      fontFamily: {
        supportAllValues: true,
      },
      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true,
      },
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3',
          },
          {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4',
          },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5',
          },
          {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6',
          },
        ],
      },
      image: {
        toolbar: ['imageTextAlternative', '|', 'ckboxImageEdit'],
      },
      mediaEmbed: {
        toolbar: ['comment'],
      },
      menuBar: {
        isVisible: true,
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableProperties',
          'tableCellProperties',
        ],
      },
      licenseKey: LICENSE_KEY,
      sidebar: {
        container: this.editorAnnotations.nativeElement,
      },
    };

    configUpdateAlert(this.config);

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }

  public ngOnDestroy(): void {
    this.isLayoutReady = false;
  }

  public showEditorDataInConsole(domEvt: any): void {
    if (!this.editorInstance) {
      return;
    }

    const editorData = this.editorInstance.data.get();
    const commentThreadsData = (
      this.editorInstance.plugins.get(
        'CommentsRepository'
      ) as CommentsRepository
    ).getCommentThreads({
      skipNotAttached: true,
      skipEmpty: true,
      toJSON: true,
    });

    console.log('Editor data:');
    console.log(editorData);
    console.log('Comment threads data:');
    console.log(commentThreadsData);

    commentThreadsData.forEach((commentThreadData) => {
      console.log('found text for ', commentThreadData.threadId, {
        key: this.extractTextBetweenPTags(
          commentThreadData.comments[0].content
        ),
        userId: commentThreadData.comments[0].authorId,
        text: this.extractCommentText(editorData, commentThreadData.threadId),
      });
    });

    domEvt.preventDefault();
  }

  public generateChunks(): void {
    if (!this.editorInstance) {
      return;
    }
    const editorData = this.editorInstance.data.get();
    const commentThreadsData = (
      this.editorInstance.plugins.get(
        'CommentsRepository'
      ) as CommentsRepository
    ).getCommentThreads({
      skipNotAttached: true,
      skipEmpty: true,
      toJSON: true,
    });

    const chunks = commentThreadsData.map((commentThreadData) => {
      return {
        key: this.extractTextBetweenPTags(
          commentThreadData.comments[0].content
        ),
        userId: commentThreadData.comments[0].authorId,
        text: this.extractCommentText(editorData, commentThreadData.threadId),
      } as PolicyChunk;
    });

    this.chunksCreated.emit(chunks);
  }

  @HostListener('window:resize', ['$event'])
  public refreshDisplayMode(): void {
    if (!this.editorInstance || !this.editorAnnotations) {
      return;
    }

    const sidebarElement = this.editorAnnotations.nativeElement.parentElement;
    const annotationsUIs = this.editorInstance.plugins.get('AnnotationsUIs');

    if (window.innerWidth < 1070) {
      this.renderer.removeClass(sidebarElement, 'narrow');
      this.renderer.addClass(sidebarElement, 'hidden');
      annotationsUIs.switchTo('inline');
    } else if (window.innerWidth < 1300) {
      this.renderer.removeClass(sidebarElement, 'hidden');
      this.renderer.addClass(sidebarElement, 'narrow');
      annotationsUIs.switchTo('narrowSidebar');
    } else {
      this.renderer.removeClass(sidebarElement, 'hidden');
      this.renderer.removeClass(sidebarElement, 'narrow');
      annotationsUIs.switchTo('wideSidebar');
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  public checkPendingActions(domEvt: any): boolean {
    if (this.editorInstance?.plugins.get('PendingActions').hasAny) {
      domEvt.preventDefault();
      domEvt.returnValue = true;
      return false;
    }

    return true;
  }

  private extractCommentText(input: string, id: string): string | null {
    const startTagPattern = new RegExp(
      `<comment-start name="${id}[^"]*"></comment-start>`
    );
    const endTagPattern = new RegExp(
      `<comment-end name="${id}[^"]*"></comment-end>`
    );

    const startTagMatch = input.match(startTagPattern);
    if (!startTagMatch) {
      return null; // Start tag not found
    }

    const endTagMatch = input.match(endTagPattern);
    if (!endTagMatch) {
      return null; // End tag not found
    }

    const startTagEndIndex = startTagMatch.index! + startTagMatch[0].length;
    const endTagStartIndex = endTagMatch.index!;

    const textBetweenTags = input
      .substring(startTagEndIndex, endTagStartIndex)
      .trim();

    return textBetweenTags;
  }

  private extractTextBetweenPTags(input: string): string | null {
    const startTag = '<p>';
    const endTag = '</p>';

    const startIndex = input.indexOf(startTag);
    if (startIndex === -1) {
      return null; // Start tag not found
    }

    const endIndex = input.indexOf(endTag, startIndex);
    if (endIndex === -1) {
      return null; // End tag not found
    }

    const startTagEndIndex = startIndex + startTag.length;
    const textBetweenTags = input.substring(startTagEndIndex, endIndex).trim();

    return textBetweenTags;
  }
}
