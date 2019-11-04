import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'all-movies',
        loadChildren: () => import('../all-movies/all-movies.module').then(m => m.AllMoviesModule)
    },
  ])],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
