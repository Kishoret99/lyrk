import { Component, OnInit, Inject } from '@angular/core';
import { APP_STATE, Store } from 'src/app/store/core';
import { getBannersRequestAction } from 'src/app/store/banners/actions';
import { getBannersSelector } from 'src/app/store/banners/selector';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public banners$;
  constructor(
    @Inject(APP_STATE) private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(getBannersRequestAction('banners'));

    this.banners$ = this.store.select(getBannersSelector());
    this.store.select(getBannersSelector()).subscribe(banners => {
      console.log('####', banners);
    })

  }

}
