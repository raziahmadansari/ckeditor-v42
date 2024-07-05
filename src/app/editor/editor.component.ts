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

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.config = new EditorConfigBuilder()
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
      .addImageConfig()
      .addLinkConfig()
      .addListConfig()
      .addMentionConfig()
      .addMenuBarConfig()
      .addPaginationConfig()
      .addTableConfig()
      .addSidebarSupport(this.editorAnnotations.nativeElement)
      .getConfig();

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
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
  }
}
