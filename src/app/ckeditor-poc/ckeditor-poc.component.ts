import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  DecoupledEditor,
  EditorConfig,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  Base64UploadAdapter,
  Bold,
  Code,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Minimap,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
  RestrictedEditingMode,
  StandardEditingMode,
  BlockQuote,
  CodeBlock,
  GeneralHtmlSupport,
  Mention,
  ClassicEditor,
} from 'ckeditor5';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Comments,
  CommentsRepository,
  MergeFields,
  MultiLevelList,
  SlashCommand,
  Template,
  TrackChanges,
  TrackChangesData,
} from 'ckeditor5-premium-features';
import { CommentsIntegration, TrackChangesIntegration } from './adapters';

import { defaultHtmlToLoad } from './default-html-to-load';
import { UsersInit } from './users/users-init-plugin';
import { Ckeditor2Component } from './ckeditor2/ckeditor2.component';

/** trial expires October 18, 2024 */
const LICENSE_KEY =
  'MlVnUUovS1FXVkIxNStvdW9TYUhuQ3I5VmJZYTNCUWdvU25ScWpGbFgxTkJtUExTUzN3ZGRXK2RuNjJrVlE9PS1NakF5TkRFd01UZz0=';
// example collaboration features from ckeditor5 https://github.com/ckeditor/ckeditor5-collaboration-samples/blob/master/collaboration-for-angular/src/app/app.component.ts
@Component({
  selector: 'app-ckeditor-poc',
  standalone: true,
  imports: [
    CommonModule,
    CKEditorModule,
    ReactiveFormsModule,
    Ckeditor2Component,
  ],
  templateUrl: './ckeditor-poc.component.html',
  styleUrl: './ckeditor-poc.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CKEditorPOCComponent {
  @ViewChild('editorToolbarElement')
  private editorToolbar!: ElementRef<HTMLDivElement>;
  @ViewChild('editorMenuBarElement')
  private editorMenuBar!: ElementRef<HTMLDivElement>;
  @ViewChild('editorAnnotationsElement')
  private editorAnnotations!: ElementRef<HTMLDivElement>;

  form = new FormGroup({
    editor: new FormControl(
      sessionStorage.getItem('editordata')
        ? JSON.parse(sessionStorage.getItem('editordata')!).data
        : defaultHtmlToLoad
    ),
  });
  constructor(renderer: Renderer2, changeDetector: ChangeDetectorRef) {
    this.renderer = renderer;
    this.changeDetector = changeDetector;
  }

  private renderer: Renderer2;
  private changeDetector: ChangeDetectorRef;

  public isLayoutReady = false;
  public Editor = DecoupledEditor;
  editorInstance: ClassicEditor | DecoupledEditor | null = null;
  public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
  public templateIntro = {
    title: 'Introduction',
    data: "<h2>Introduction</h2><p>In today's fast-paced world, keeping up with the latest trends and insights is essential for both personal growth and professional development. This article aims to shed light on a topic that resonates with many, providing valuable information and actionable advice. Whether you're seeking to enhance your knowledge, improve your skills, or simply stay informed, our comprehensive analysis offers a deep dive into the subject matter, designed to empower and inspire our readers.</p>",
  };
  public templateIntroRestricted = {
    title: 'Introduction (Unrestricted)',
    data: `<span class="restricted-editing-exception"><h2>Introduction</h2><p>In today's fast-paced world, keeping up with the latest trends and insights is essential for both personal growth and professional development. This article aims to shed light on a topic that resonates with many, providing valuable information and actionable advice. Whether you're seeking to enhance your knowledge, improve your skills, or simply stay informed, our comprehensive analysis offers a deep dive into the subject matter, designed to empower and inspire our readers.</p></span>`,
  };
  public ngAfterViewInit(): void {
    this.config = {
      sidebar: {
        container: this.editorAnnotations.nativeElement,
      },
      toolbar: {
        items: [
          'insertMergeField',
          'previewMergeFields',
          '|',
          'insertTemplate',
          '|',
          // 'restrictedEditing',
          'restrictedEditingException',
          '|',
          'undo',
          'redo',
          '|',
          'trackChanges',
          'comment',
          'commentsArchive',
          '|',
          'findAndReplace',
          '|',
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'subscript',
          'superscript',
          'code',
          'removeFormat',
          '|',
          'specialCharacters',
          'horizontalLine',
          'pageBreak',
          'link',
          'insertImage',
          'insertImageViaUrl',
          'insertTable',
          'blockQuote',
          'codeBlock',
          '|',
          'alignment',
          '|',
          'bulletedList',
          'numberedList',
          'multiLevelList',
          'todoList',
          'outdent',
          'indent',
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        AccessibilityHelp,
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        Base64UploadAdapter,
        BlockQuote,
        Bold,
        Code,
        CodeBlock,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Heading,
        HorizontalLine,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        PageBreak,
        Paragraph,
        PasteFromOffice,
        RemoveFormat,
        // RestrictedEditingMode,
        SelectAll,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TodoList,
        Underline,
        Undo,
        AccessibilityHelp,
        Autosave,
        Essentials,
        List,
        Mention,

        // Premium features
        MergeFields,
        MultiLevelList,
        SlashCommand,
        Template,
        // RestrictedEditingMode,
        StandardEditingMode,

        // Collaboration
        Comments,
        CommentsRepository,
        TrackChanges,
        TrackChangesData,

        // Custom adapters
        UsersInit,
        CommentsIntegration,
        TrackChangesIntegration, // To use, user must turn it on in the menu bar, then make edits to the document
      ],
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
      image: {
        toolbar: [
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'imageStyle:inline',
          'imageStyle:wrapText',
          'imageStyle:breakText',
          '|',
          'resizeImage',
        ],
      },
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file',
            },
          },
        },
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
      menuBar: {
        isVisible: true,
      },
      placeholder: 'Type or paste your content here!',
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
      mention: {
        feeds: [
          {
            marker: '@',
            feed: [
              /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
            ],
          },
        ],
      },
      mergeFields: {
        definitions: [
          {
            id: 'guestName',
            label: 'Guest name', // Optional.
            defaultValue: 'Guest', // Optional.
          },
          {
            id: 'guestAddress',
            type: 'block',
            label: 'Guest address', // Optional.
            defaultValue: '<div style="height: 150px;">2001 Default Ave.<div>',
          },
          {
            id: 'guestEmailWithNoDefaultValue',
            label:
              'Guest email with no default value, like if used in a template creation',
          },
        ],
      },
      template: {
        definitions: [
          {
            title: this.templateIntro.title,
            description: 'Simple introduction to an article',
            icon: '<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <g id="icons/article-image-right">\n        <rect id="icon-bg" width="45" height="45" rx="2" fill="#A5E7EB"/>\n        <g id="page" filter="url(#filter0_d_1_507)">\n            <path d="M9 41H36V12L28 5H9V41Z" fill="white"/>\n            <path d="M35.25 12.3403V40.25H9.75V5.75H27.7182L35.25 12.3403Z" stroke="#333333" stroke-width="1.5"/>\n        </g>\n        <g id="image">\n            <path id="Rectangle 22" d="M21.5 23C21.5 22.1716 22.1716 21.5 23 21.5H31C31.8284 21.5 32.5 22.1716 32.5 23V29C32.5 29.8284 31.8284 30.5 31 30.5H23C22.1716 30.5 21.5 29.8284 21.5 29V23Z" fill="#B6E3FC" stroke="#333333"/>\n            <path id="Vector 1" d="M24.1184 27.8255C23.9404 27.7499 23.7347 27.7838 23.5904 27.9125L21.6673 29.6268C21.5124 29.7648 21.4589 29.9842 21.5328 30.178C21.6066 30.3719 21.7925 30.5 22 30.5H32C32.2761 30.5 32.5 30.2761 32.5 30V27.7143C32.5 27.5717 32.4391 27.4359 32.3327 27.3411L30.4096 25.6268C30.2125 25.451 29.9127 25.4589 29.7251 25.6448L26.5019 28.8372L24.1184 27.8255Z" fill="#44D500" stroke="#333333" stroke-linejoin="round"/>\n            <circle id="Ellipse 1" cx="26" cy="25" r="1.5" fill="#FFD12D" stroke="#333333"/>\n        </g>\n        <rect id="Rectangle 23" x="13" y="13" width="12" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 24" x="13" y="17" width="19" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 25" x="13" y="21" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 26" x="13" y="25" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 27" x="13" y="29" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 28" x="13" y="33" width="16" height="2" rx="1" fill="#B4B4B4"/>\n    </g>\n    <defs>\n        <filter id="filter0_d_1_507" x="9" y="5" width="28" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n            <feFlood flood-opacity="0" result="BackgroundImageFix"/>\n            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n            <feOffset dx="1" dy="1"/>\n            <feComposite in2="hardAlpha" operator="out"/>\n            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0"/>\n            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_507"/>\n            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_507" result="shape"/>\n        </filter>\n    </defs>\n</svg>\n',
            data: this.templateIntro.data,
          },
          {
            title: this.templateIntroRestricted.title,
            description: 'Simple introduction to an article',
            icon: '<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <g id="icons/article-image-right">\n        <rect id="icon-bg" width="45" height="45" rx="2" fill="#A5E7EB"/>\n        <g id="page" filter="url(#filter0_d_1_507)">\n            <path d="M9 41H36V12L28 5H9V41Z" fill="white"/>\n            <path d="M35.25 12.3403V40.25H9.75V5.75H27.7182L35.25 12.3403Z" stroke="#333333" stroke-width="1.5"/>\n        </g>\n        <g id="image">\n            <path id="Rectangle 22" d="M21.5 23C21.5 22.1716 22.1716 21.5 23 21.5H31C31.8284 21.5 32.5 22.1716 32.5 23V29C32.5 29.8284 31.8284 30.5 31 30.5H23C22.1716 30.5 21.5 29.8284 21.5 29V23Z" fill="#B6E3FC" stroke="#333333"/>\n            <path id="Vector 1" d="M24.1184 27.8255C23.9404 27.7499 23.7347 27.7838 23.5904 27.9125L21.6673 29.6268C21.5124 29.7648 21.4589 29.9842 21.5328 30.178C21.6066 30.3719 21.7925 30.5 22 30.5H32C32.2761 30.5 32.5 30.2761 32.5 30V27.7143C32.5 27.5717 32.4391 27.4359 32.3327 27.3411L30.4096 25.6268C30.2125 25.451 29.9127 25.4589 29.7251 25.6448L26.5019 28.8372L24.1184 27.8255Z" fill="#44D500" stroke="#333333" stroke-linejoin="round"/>\n            <circle id="Ellipse 1" cx="26" cy="25" r="1.5" fill="#FFD12D" stroke="#333333"/>\n        </g>\n        <rect id="Rectangle 23" x="13" y="13" width="12" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 24" x="13" y="17" width="19" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 25" x="13" y="21" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 26" x="13" y="25" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 27" x="13" y="29" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 28" x="13" y="33" width="16" height="2" rx="1" fill="#B4B4B4"/>\n    </g>\n    <defs>\n        <filter id="filter0_d_1_507" x="9" y="5" width="28" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n            <feFlood flood-opacity="0" result="BackgroundImageFix"/>\n            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n            <feOffset dx="1" dy="1"/>\n            <feComposite in2="hardAlpha" operator="out"/>\n            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0"/>\n            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_507"/>\n            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_507" result="shape"/>\n        </filter>\n    </defs>\n</svg>\n',
            data: this.templateIntroRestricted.data,
          },
        ],
      },
      comments: {
        editorConfig: {
          extraPlugins: [Bold, Italic, Underline, List, Autoformat],
        },
      },
    };
    configUpdateAlert(this.config);
    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }

  public onReady(editor: DecoupledEditor): void {
    Array.from(this.editorToolbar.nativeElement.children).forEach((child) =>
      child.remove()
    );
    Array.from(this.editorMenuBar.nativeElement.children).forEach((child) =>
      child.remove()
    );

    this.editorToolbar.nativeElement.appendChild(
      editor.ui.view.toolbar.element!
    );
    this.editorMenuBar.nativeElement.appendChild(
      editor.ui.view.menuBarView.element!
    );
    this.editorInstance = editor;

    CKEditorInspector.attach(editor);
    console.log(editor.getData());
  }

  // data for drag and drop
  fieldMap: Map<string, string> = new Map<string, string>([
    ['intro', this.templateIntro.data],
    ['introRestricted', this.templateIntroRestricted.data],
  ]);

  ngOnInit() {
    this.form.controls.editor.valueChanges.subscribe((e) => {
      sessionStorage.setItem('editordata', JSON.stringify({ data: e }) ?? '');
    });
  }

  // drag and drop stuff here
  allowDrop(ev: any): void {
    ev.preventDefault();
  }

  drag(ev: any): void {
    console.log('drage', ev.target);
    ev.dataTransfer.setData('dragElement', ev.target.id);
  }

  drop(ev: any): void {
    ev.preventDefault();
    if (this.editorInstance) {
      const data = ev.dataTransfer.getData('dragElement');
      const dataValue = this.fieldMap.get(data);
      if (dataValue) {
        const viewFragment =
          this.editorInstance.data.processor.toView(dataValue);
        const modelFragment = this.editorInstance.data.toModel(viewFragment);
        this.editorInstance.model.insertContent(modelFragment);
      } else {
        console.error('dataValue is not available');
      }
    } else {
      console.error('editorInstance is not available');
    }
  }

  @HostListener('window:resize', ['$event'])
  public refreshDisplayMode(): void {
    if (!this.editorInstance || !this.editorAnnotations) {
      return;
    }

    const sidebarElement = this.editorAnnotations.nativeElement.parentElement;
    const annotationsUIs = this.editorInstance.plugins.get('AnnotationsUIs');

    if (window.innerWidth < 1070) {
      console.log('setting comments inline');
      this.renderer.removeClass(sidebarElement, 'narrow');
      this.renderer.addClass(sidebarElement, 'hidden');
      // prolly need to make sure to remove the sidebar from the DOM here
      annotationsUIs.switchTo('inline');
    } else if (window.innerWidth < 1300) {
      console.log('setting comments narrowSidebar');
      this.renderer.removeClass(sidebarElement, 'hidden');
      this.renderer.addClass(sidebarElement, 'narrow');
      annotationsUIs.switchTo('narrowSidebar');
      // prolly need to make sure to have the proper sidebar class in teh scss to have the right size here
    } else {
      console.log('setting comments wideSidebar');
      this.renderer.removeClass(sidebarElement, 'hidden');
      this.renderer.removeClass(sidebarElement, 'narrow');
      annotationsUIs.switchTo('wideSidebar');
      // the default sidebar settings in scss are for this size
    }
  }
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config: any) {
  if ((configUpdateAlert as any).configUpdateAlertShown) {
    return;
  }

  const isModifiedByUser = (
    currentValue: string | undefined,
    forbiddenValue: string
  ) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  (configUpdateAlert as any).configUpdateAlertShown = true;

  if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
    valuesToUpdate.push('LICENSE_KEY');
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        'Please update the following values in your editor config',
        'in order to receive full access to the Premium Features:',
        '',
        ...valuesToUpdate.map((value) => ` - ${value}`),
      ].join('\n')
    );
  }
}
