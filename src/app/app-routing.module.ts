import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TempleComponent } from './pages/temple/temple.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

const routes: Routes = [
  { path: 'temple', component: TempleComponent },
  { path: 'reactive', component: ReactiveComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'reactive' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
