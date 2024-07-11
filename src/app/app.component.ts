import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { EditorComponent } from './editor/editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ckeditor-v42';

  @ViewChild('viewContainer', { static: true, read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  editorCount: number = 200;
  editors: Array<number> = [];
  isLayoutReady: boolean = false;

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    // for (let i = 1; i <= this.editorCount; i++) {
    //   this.editors.push(i);
    // }

    // this.isLayoutReady = true;
    // this.changeDetector.detectChanges();

    this.renderEditors();
  }

  renderEditors(): void {
    this.viewContainer.clear();
    for (let i = 1; i <= this.editorCount; i++) {
      this.viewContainer.createComponent(EditorComponent);
    }

    this.changeDetector.detectChanges();
  }
}
