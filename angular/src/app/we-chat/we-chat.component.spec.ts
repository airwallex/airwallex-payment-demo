import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeChatComponent } from './we-chat.component';

describe('WeChatComponent', () => {
  let component: WeChatComponent;
  let fixture: ComponentFixture<WeChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
