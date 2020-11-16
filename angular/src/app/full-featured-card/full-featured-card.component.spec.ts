import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFeaturedCardComponent } from './full-featured-card.component';

describe('FullFeaturedCardComponent', () => {
  let component: FullFeaturedCardComponent;
  let fixture: ComponentFixture<FullFeaturedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullFeaturedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullFeaturedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
