import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { BannerComponent } from './banner.component';
import { of } from 'rxjs';

describe('BannerComponent', () => {
  let spectator: Spectator<BannerComponent>;
  const createComponent = createComponentFactory({
    component: BannerComponent,
  });
  
  beforeEach(() => {
    spectator = null
  });

  it('should set the class name according to the [className] input', () => {

    spectator = createComponent({
      props: {
        banners$: of({
          data: [
            {
              active: true,
              imageUrl: 'https://dummyimage.com/300x150/d3d4e3/0011ff',
              movieLink: '/movies/f5rHQPW7HHY9KmGhsFWW',
              title: 'Chaanakya'
          }],
          status: 'SUCCESS',
          error: null
        })
    }
    });
    spectator.fixture.detectChanges();
    expect(spectator.component.slidesLength).toEqual(1)
  });

  it('should set the class name according to the input', () => {

    spectator = createComponent({
        props: {
            banners$: of({
              data: [
                {
                  active: true,
                  imageUrl: 'https://dummyimage.com/300x150/d3d4e3/0011ff',
                  movieLink: '/movies/f5rHQPW7HHY9KmGhsFWW',
                  title: 'Chaanakya'
              }],
              status: 'SUCCESS',
              error: null
            })
        }
    });
    expect(spectator.component.slidesLength).toEqual(1)
  });
});