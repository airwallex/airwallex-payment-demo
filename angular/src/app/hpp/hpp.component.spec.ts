import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HppComponent } from './hpp.component';

describe('HppComponent', () => {
  let component: HppComponent;
  let fixture: ComponentFixture<HppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
