import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { BannerComponent } from './banner.component';
import { of, empty } from 'rxjs';

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

  it('should have 5 loading images when the subscription is not yet loaded', () => {
    spectator = createComponent({
      props: {
        banners$: empty()
      }
    });
    spectator.fixture.detectChanges();
    expect(spectator.component.currentSlide).toEqual(1);

    const nodes = spectator.queryAll('.lyrkcard');
    expect(nodes).toHaveLength(5);
    
    nodes.forEach((node, index) => {
      if(index == 0 || index == 1) {
        expect(node).toHaveStyle({display:"block"});
      } else {
        expect(node).toHaveStyle({display: "none"});
      }
    })

    spectator.component.nextSlide();
    spectator.component.nextSlide();
    expect(spectator.component.currentSlide).toEqual(3);

    nodes.forEach((node, index) => {
      if(index == 1 || index == 2 || index == 3) {
        expect(node).toHaveStyle({display:"block"});
      } else {
        expect(node).toHaveStyle({display: "none"});
      }
    })
    
    spectator.component.prevSlide();
    expect(spectator.component.currentSlide).toEqual(2);

    nodes.forEach((node, index) => {
      if(index == 0 || index == 1 || index == 2) {
        expect(node).toHaveStyle({display:"block"});
      } else {
        expect(node).toHaveStyle({display: "none"});
      }
    })
  })
});