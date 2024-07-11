import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { MultirootEditorComponent } from './multiroot-editor/multiroot-editor.component';
import './models/global.declaration';

@NgModule({
  declarations: [AppComponent, EditorComponent, MultirootEditorComponent],
  imports: [BrowserModule, AppRoutingModule, CKEditorModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
