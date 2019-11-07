import { Component, OnInit, Input, ChangeDetectionStrategy, Directive } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {

  @Input() banners$;
  banners;
  loadingBanners;
  public currentSlide: number;
  public slidesLength: number;
  constructor() { }

  ngOnInit() {
    this.slidesLength = 5;
    this.loadingBanners = (new Array(this.slidesLength)).fill(null);
    this.currentSlide = 1;
    this.banners$.subscribe(bannersState => {
      this.banners = bannersState.data;
      this.slidesLength = this.banners.length;
      this.currentSlide = 1;
      this.updateSlide();
    })
  }

  ngAfterViewInit() {
    this.updateSlide();
  }
  nextSlide() {
    this.currentSlide += 1;
    if(this.currentSlide > this.slidesLength) {
      this.currentSlide = 1;
    }
    this.updateSlide();
  }

  prevSlide() {
    this.currentSlide -= 1;
    if(this.currentSlide < 1) {
      this.currentSlide = this.slidesLength;
    }
    this.updateSlide();
  }

  private updateSlide() {
    // @ts-ignore
    const slides: HTMLDivElement[] = document.querySelectorAll('.lyrk-card-list .lyrkcard');
    if (!slides || slides.length == 0) {
      return;
    }
    slides.forEach((slide: HTMLDivElement) => {
      slide.style.display = 'none';
    })
    const currIndex = this.currentSlide - 1;
    slides[currIndex].style.display = 'block';
    slides[currIndex - 1] ? (slides[currIndex - 1].style.display = 'block') : '';
    slides[currIndex + 1] ? (slides[currIndex + 1].style.display = 'block') : '';
  }
}
