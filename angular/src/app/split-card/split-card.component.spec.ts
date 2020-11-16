import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitCardComponent } from './split-card.component';

describe('SplitCardComponent', () => {
  let component: SplitCardComponent;
  let fixture: ComponentFixture<SplitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
