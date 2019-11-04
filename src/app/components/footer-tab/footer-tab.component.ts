import { Component, OnInit } from '@angular/core';
import {MDCTabBar} from '@material/tab-bar';


@Component({
  selector: 'app-footer-tab',
  templateUrl: './footer-tab.component.html',
  styleUrls: ['./footer-tab.component.scss']
})
export class FooterTabComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
  }

}
