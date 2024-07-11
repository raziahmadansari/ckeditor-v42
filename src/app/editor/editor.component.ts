import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { DecoupledEditor, type EditorConfig } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { EditorConfigBuilder } from '../models';
import { FileManagerService } from '../services';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editorToolbarElement')
  private editorToolbar!: ElementRef<HTMLDivElement>;
  @ViewChild('editorMenuBarElement')
  private editorMenuBar!: ElementRef<HTMLDivElement>;
  @ViewChild('editorAnnotationsElement')
  private editorAnnotations!: ElementRef<HTMLDivElement>;
  @ViewChild('editorPresenceElement')
  private editorPresence!: ElementRef<HTMLDivElement>;

  isLayoutReady = false;
  Editor = DecoupledEditor;
  config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
  editorMode: 'lite' | 'full' = 'lite';

  message: string = '';
  data: string = '';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private fileManagerService: FileManagerService
  ) {}

  ngAfterViewInit(): void {
    this.config = this.getMininalConfig();
    this.config.commentsOnly = true;

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }

  getConfig(): EditorConfig {
    return new EditorConfigBuilder()
      .addToolbarConfig()
      .addBalloonToolbarConfig()
      .addFullPluginsSupport()
      .addExtraPluginsSupport()
      .addCommentsConfig()
      .addExportPDFConfig()
      .addExportWordConfig()
      .addFontFamilyConfig()
      .addFontSizeConfig()
      .addHeadingConfig()
      .addHTMLSupport()
      .addImageConfig()
      .addLinkConfig()
      .addListConfig()
      .addMentionConfig()
      .addMenuBarConfig()
      .addPaginationConfig()
      .addTableConfig()
      .addSidebarSupport(this.editorAnnotations.nativeElement)
      .getConfig();
  }

  getMininalConfig(): EditorConfig {
    return (
      new EditorConfigBuilder()
        .addToolbarConfigLite()
        // .addToolbarConfig()
        .addBalloonToolbarConfig()
        // .addFullPluginsSupport()
        .addMinimalPluginsSupport()
        .addExtraPluginsSupport()
        .addCommentsConfig()
        // .addExportPDFConfig()
        // .addExportWordConfig()
        .addFontFamilyConfig()
        .addFontSizeConfig()
        .addHeadingConfig()
        .addHTMLSupport()
        .addImageConfig()
        // .addLinkConfig()
        // .addListConfig()
        .addMentionConfig()
        // .addMenuBarConfig()
        // .addPaginationConfig()
        // .addTableConfig()
        .addSidebarSupport(this.editorAnnotations.nativeElement)
        .getConfig()
    );
  }

  onReady(editor: DecoupledEditor): void {
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

    window.editor = editor;
  }

  uploadFile(files: FileList | null): void {
    if (!files) {
      return;
    }

    this.message = '';
    this.data = '';

    const fileToUpload = files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.fileManagerService.uploadFile(formData).subscribe({
      next: (response: any) => {
        this.message = 'Uploaded';
        this.data = response;
        this.changeDetector.detectChanges();
        window.editor?.setData(this.data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getData(): void {
    console.log(window.editor?.getData());
  }

  switchEditor(): void {
    console.log('switch editor called');
    this.data = window.editor?.getData() ?? 'N/A';
    this.isLayoutReady = false;
    this.changeDetector.detectChanges();

    this.editorMode = this.editorMode === 'lite' ? 'full' : 'lite';
    this.config =
      this.editorMode === 'lite' ? this.getMininalConfig() : this.getConfig();
    this.config.initialData = this.data;
    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }
}
