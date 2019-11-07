import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { BannerComponent } from './banner.component';
import { of, empty, timer } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { map } from 'rxjs/operators';

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

  it('when loaded, loadng mages should go and banner dv should render', () => {

    spectator = createComponent({
        props: {
            banners$: of({
              data: [
                {
                  active: true,
                  imageUrl: 'https://dummyimage.com/300x150/d3d4e3/0011ff',
                  movieLink: '/movies/f5rHQPW7HHY9KmGhsFWW',
                  title: 'Chaanakya'
                },
                {
                  active: true,
                  imageUrl: 'https://dummyimage.com/300x150/d3d4e3/0011ff',
                  movieLink: '/movies/f5rHQPW7HHY9KmGhsFWW',
                  title: 'Oxygen'
                }
              ],
              status: 'SUCCESS',
              error: null
            })
        }
    });
    expect(spectator.component.slidesLength).toEqual(2);
    expect(spectator.component.currentSlide).toEqual(1);
    const nodes = spectator.queryAll('.lyrkcard');
    expect(nodes).toHaveLength(2);
    nodes.forEach((node, index) => {
      switch(index) {
        case 0:
          expect(node).toHaveDescendantWithText({selector: '.subtitle', text: 'Chaanakya'})
          break;
        
        case 2:
          expect(node).toHaveDescendantWithText({selector: '.subtitle', text: 'Oxygen'})
          break;
      }
    })
  });

  it('default show loadng and then after respone s loaded show the banners', fakeAsync(() => {

    spectator = createComponent({
        props: {
            banners$: timer(5000).pipe(map(() => ({
              data: [
                {
                  active: true,
                  imageUrl: 'https://dummyimage.com/300x150/d3d4e3/0011ff',
                  movieLink: '/movies/f5rHQPW7HHY9KmGhsFWW',
                  title: 'Chaanakya'
                },
                {
                  active: true,
                  imageUrl: 'https://dummyimage.com/300x150/d3d4e3/0011ff',
                  movieLink: '/movies/f5rHQPW7HHY9KmGhsFWW',
                  title: 'Oxygen'
                },
                {
                  active: true,
                  imageUrl: 'https://dummyimage.com/300x150/d3d4e3/0011ff',
                  movieLink: '/movies/f5rHQPW7HHY9KmGhsFWW',
                  title: 'Chaanakya'
                }
              ],
              status: 'SUCCESS',
              error: null
            })))
        },
        detectChanges: false
    });
    spectator.detectChanges();
    expect(spectator.component.slidesLength).toEqual(5);
    tick(5000);
    spectator.detectChanges();
    spectator.component
    const nodes = spectator.queryAll('.lyrkcard');
    expect(nodes).toHaveLength(3);
  
    expect(spectator.element).toHaveData({data: 'clientHeight', val: '5px'})
  }));
});