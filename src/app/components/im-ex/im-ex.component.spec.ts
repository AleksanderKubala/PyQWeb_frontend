import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImExComponent } from './im-ex.component';

describe('ImExComponent', () => {
  let component: ImExComponent;
  let fixture: ComponentFixture<ImExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
