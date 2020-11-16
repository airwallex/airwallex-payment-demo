import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropInComponent } from './drop-in.component';

describe('DropInComponent', () => {
  let component: DropInComponent;
  let fixture: ComponentFixture<DropInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
