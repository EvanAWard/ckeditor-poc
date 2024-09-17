import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'ck',
  //note: ckeditor doesn't load properly if this isn't lazy loaded
  loadComponent: () => import('./ckeditor-poc/ckeditor-poc.component').then(c => c.CKEditorPOCComponent)
},
{
  path: 'prose',
  loadComponent:  () => import('./prose-mirror-poc/prose-mirror-poc.component').then(c => c.ProseMirrorPOCComponent) }];
