import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './containers/shell/shell.component';

const routes: Routes = [
  {
    path: '', 
    component: ShellComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./containers/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'all-movies',
        loadChildren: () => import('./containers/all-movies/all-movies.module').then(m => m.AllMoviesModule)
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'movie',
    loadChildren:  () => import('./containers/movie/movie.module').then(m => m.MovieModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
