import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { PageComponent } from './core/page/page.component';


const routes: Routes = [
  { path: '', component: PageComponent, children: [
    { path: 'data-form', loadChildren:  () => import('./data-form/data-form.module').then(m => m.DataFormModule)},
    { path: 'template-form', loadChildren: () => import('./template-form/template-form.module').then(m => m.TemplateFormModule)},
  ]},
  {
    path:'**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
