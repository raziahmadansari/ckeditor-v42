import { DecoupledEditor } from 'ckeditor5';

declare global {
  interface Window {
    editor: DecoupledEditor | null;
  }
}
