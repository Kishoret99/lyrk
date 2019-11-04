import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellComponent } from './shell.component';
import { FooterTabComponent } from '../../components/footer-tab/footer-tab.component';
import { TranslationModule } from 'src/app/store/translate';
import { ShellRoutingModule } from './shell-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
      ShellComponent,
      FooterTabComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    TranslationModule.forRoot()
  ]
})
export class ShellModule { }
