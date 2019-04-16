import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockChildComponent } from './stock-child.component';

describe('StockChildComponent', () => {
  let component: StockChildComponent;
  let fixture: ComponentFixture<StockChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
