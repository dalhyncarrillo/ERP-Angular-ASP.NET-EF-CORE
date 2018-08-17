import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddItemComponent } from './order-add-item.component';

describe('OrderAddItemComponent', () => {
  let component: OrderAddItemComponent;
  let fixture: ComponentFixture<OrderAddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
