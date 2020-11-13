import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoComponent } from './modulocarrito.component';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
